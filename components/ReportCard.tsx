import React from 'react';
import { SessionReport } from '../types';
import { ScoreRing } from './ScoreRing';
import { Button } from './ui/Button';
import { Download, Share2, RefreshCw } from 'lucide-react';

interface ReportCardProps {
  report: SessionReport;
  onRestart: () => void;
}

export const ReportCard: React.FC<ReportCardProps> = ({ report, onRestart }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
      
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">Session Complete</h2>
        <p className="text-gray-400">Here is how you performed in "{report.scenarioId}"</p>
      </div>

      {/* Main Score */}
      <div className="glass-panel p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-8">
           <ScoreRing score={report.overallScore} label="Overall Score" size="lg" color="text-cyan-neon" />
           <div className="space-y-1">
             <h3 className="text-2xl font-bold text-white">Excellent Work!</h3>
             <p className="text-gray-400 text-sm max-w-xs">You handled the objections well, but could improve on technical clarity regarding the efficacy data.</p>
           </div>
        </div>
        <div className="flex gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{report.durationSeconds}s</p>
            <p className="text-xs text-gray-500 uppercase">Duration</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{report.transcript.length}</p>
            <p className="text-xs text-gray-500 uppercase">Turns</p>
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-navy-light/50 p-6 rounded-2xl flex flex-col items-center">
          <ScoreRing score={report.metrics.tone} label="Tone" size="md" color="text-purple-neon" />
        </div>
        <div className="bg-navy-light/50 p-6 rounded-2xl flex flex-col items-center">
          <ScoreRing score={report.metrics.clarity} label="Clarity" size="md" color="text-blue-400" />
        </div>
        <div className="bg-navy-light/50 p-6 rounded-2xl flex flex-col items-center">
          <ScoreRing score={report.metrics.empathy} label="Empathy" size="md" color="text-pink-400" />
        </div>
        <div className="bg-navy-light/50 p-6 rounded-2xl flex flex-col items-center">
          <ScoreRing score={report.metrics.technical} label="Technical" size="md" color="text-yellow-400" />
        </div>
      </div>

      {/* Transcript */}
      <div className="bg-navy-dark border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Transcript Analysis</h3>
        <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
          {report.transcript.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                msg.role === 'user' 
                  ? 'bg-cyan-neon/10 text-cyan-100 rounded-tr-none' 
                  : 'bg-navy-light text-gray-300 rounded-tl-none'
              }`}>
                <span className="text-xs font-bold block mb-1 opacity-50 uppercase">{msg.role}</span>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={() => {}}>
          <Download size={18} /> Download Report
        </Button>
        <Button variant="primary" onClick={onRestart}>
          <RefreshCw size={18} /> Start New Session
        </Button>
      </div>

    </div>
  );
};
