import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Square, Volume2 } from 'lucide-react';
import { Button } from './ui/Button';
import { WaveformVisualizer } from './WaveformVisualizer';
import { FeedbackCard } from './FeedbackCard';
import { Scenario, Message, Feedback, SessionMetrics } from '../types';
import { generateRoleplayResponse } from '../services/geminiService';
import { cn } from '../lib/utils';

interface VoiceInterfaceProps {
  scenario: Scenario;
  onFinish: (transcript: Message[], metrics: SessionMetrics) => void;
}

type SessionState = 'idle' | 'listening' | 'processing' | 'speaking';

export const VoiceInterfaceLocal: React.FC<VoiceInterfaceProps> = ({ scenario, onFinish }) => {
  const [state, setState] = useState<SessionState>('idle');
  const [transcript, setTranscript] = useState<Message[]>([]);
  const [currentFeedback, setCurrentFeedback] = useState<Feedback | null>(null);
  const [currentMetrics, setCurrentMetrics] = useState<SessionMetrics>({ tone: 0, clarity: 0, empathy: 0, technical: 0 });
  
  // Refs for Web Speech API
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);

  // Initialize Speech APIs
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Setup TTS
      synthesisRef.current = window.speechSynthesis;

      // Setup STT
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => setState('listening');
        recognition.onend = () => {
           // If we are still in "listening" state when it ends, it means silence or manual stop, but here we handle result
           // State transition is handled in onresult usually
           if (state === 'listening') setState('idle');
        };

        recognition.onresult = async (event: any) => {
          const text = event.results[0][0].transcript;
          handleUserMessage(text);
        };

        recognitionRef.current = recognition;
      }
    }
  }, [state]); // Dependency on state helps consistency if needed, though mainly once

  // Initial greeting
  useEffect(() => {
    // Only run once on mount
    const initialMsg: Message = { role: 'model', text: scenario.initialPrompt, timestamp: Date.now() };
    setTranscript([initialMsg]);
    speak(scenario.initialPrompt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const speak = (text: string) => {
    if (!synthesisRef.current) return;
    
    // Cancel any ongoing speech
    synthesisRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    utterance.onstart = () => setState('speaking');
    utterance.onend = () => setState('idle');
    
    synthesisRef.current.speak(utterance);
  };

  const handleUserMessage = async (text: string) => {
    setState('processing');
    
    const newUserMsg: Message = { role: 'user', text, timestamp: Date.now() };
    const newHistory = [...transcript, newUserMsg];
    setTranscript(newHistory);

    // Call Gemini
    const response = await generateRoleplayResponse(newHistory, scenario.systemInstruction);

    // Update state with AI response
    const newAiMsg: Message = { role: 'model', text: response.text, timestamp: Date.now() };
    setTranscript([...newHistory, newAiMsg]);
    setCurrentFeedback(response.feedback);
    setCurrentMetrics(response.metrics);

    if (response.sessionEnded) {
      onFinish([...newHistory, newAiMsg], response.metrics);
    } else {
      speak(response.text);
    }
  };

  const toggleRecording = () => {
    if (state === 'listening') {
      recognitionRef.current?.stop();
    } else if (state === 'idle') {
      recognitionRef.current?.start();
    }
  };

  const endSession = () => {
    recognitionRef.current?.stop();
    synthesisRef.current?.cancel();
    onFinish(transcript, currentMetrics);
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto py-6">
      
      {/* Dynamic Header Info */}
      <div className="text-center mb-8 space-y-2">
         <h2 className="text-2xl font-bold text-white tracking-tight">{scenario.title}</h2>
         <p className="text-gray-400 text-sm">{scenario.description}</p>
      </div>

      {/* Visualizer Area */}
      <div className="relative mb-8">
        <WaveformVisualizer isListening={state === 'listening'} isSpeaking={state === 'speaking'} />
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
           <span className={cn(
             "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2",
             state === 'listening' ? "bg-red-500/20 text-red-400 animate-pulse" :
             state === 'speaking' ? "bg-purple-neon/20 text-purple-neon" :
             state === 'processing' ? "bg-yellow-500/20 text-yellow-400" :
             "bg-gray-700/50 text-gray-400"
           )}>
             <span className={cn("w-2 h-2 rounded-full", 
                state === 'listening' ? "bg-red-400" :
                state === 'speaking' ? "bg-purple-neon" :
                state === 'processing' ? "bg-yellow-400" : "bg-gray-400"
             )}></span>
             {state}
           </span>
        </div>
      </div>

      {/* Transcript / Feedback Area */}
      <div className="flex-1 overflow-y-auto mb-6 space-y-4 px-4 custom-scrollbar min-h-[200px]">
        {transcript.length === 0 && (
           <div className="text-center text-gray-600 mt-10">Waiting for conversation to start...</div>
        )}
        {transcript.map((msg, idx) => (
          <div key={idx} className={cn("flex w-full animate-in slide-in-from-bottom-2", msg.role === 'user' ? 'justify-end' : 'justify-start')}>
             <div className={cn(
               "max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed",
               msg.role === 'user' 
                 ? "bg-gradient-to-br from-cyan-neon/20 to-blue-600/20 border border-cyan-neon/30 text-white rounded-tr-sm" 
                 : "bg-navy-light border border-white/5 text-gray-200 rounded-tl-sm"
             )}>
               {msg.text}
             </div>
          </div>
        ))}
        {/* Show live feedback if available */}
        {currentFeedback && (
          <div className="flex justify-center my-4">
             <FeedbackCard feedback={currentFeedback} />
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mt-auto">
         <Button 
           variant="ghost" 
           size="lg" 
           className="rounded-full w-14 h-14 p-0 bg-navy-light hover:bg-navy-light/80"
           onClick={endSession}
         >
           <Square size={20} className="fill-current text-red-400" />
         </Button>

         <button 
           onClick={toggleRecording}
           className={cn(
             "w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)]",
             state === 'listening' 
               ? "bg-red-500 hover:bg-red-600 shadow-[0_0_30px_rgba(239,68,68,0.4)] scale-110" 
               : "bg-cyan-neon hover:bg-cyan-400 shadow-[0_0_30px_rgba(0,217,255,0.4)]"
           )}
         >
           {state === 'listening' ? <MicOff className="text-white w-8 h-8" /> : <Mic className="text-navy-dark w-8 h-8" />}
         </button>

         <Button 
           variant="ghost" 
           size="lg" 
           className="rounded-full w-14 h-14 p-0 bg-navy-light hover:bg-navy-light/80"
           onClick={() => speak(transcript[transcript.length-1]?.text || '')}
         >
           <Volume2 size={24} className="text-cyan-neon" />
         </Button>
      </div>
      <p className="text-center text-xs text-gray-500 mt-4">Tap mic to speak. Tap square to end.</p>
    </div>
  );
};
