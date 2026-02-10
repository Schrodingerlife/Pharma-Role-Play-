import React, { useEffect, useRef } from 'react';

interface WaveformVisualizerProps {
  isListening: boolean;
  isSpeaking: boolean;
}

export const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({ isListening, isSpeaking }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let phase = 0;

    const render = () => {
      // Handle resizing
      canvas.width = canvas.parentElement?.clientWidth || 300;
      canvas.height = canvas.parentElement?.clientHeight || 100;

      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Determine active color and amplitude based on state
      let color = 'rgba(75, 85, 99, 0.3)'; // Gray (Idle)
      let amplitude = 10;
      let speed = 0.05;

      if (isListening) {
        color = 'rgba(0, 217, 255, 0.8)'; // Cyan (User Speaking)
        amplitude = 30;
        speed = 0.2;
      } else if (isSpeaking) {
        color = 'rgba(168, 85, 247, 0.8)'; // Purple (AI Speaking)
        amplitude = 30;
        speed = 0.15;
      }

      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';

      for (let x = 0; x < width; x++) {
        // Create a sine wave combined with some noise for organic feel
        const y = centerY + Math.sin(x * 0.02 + phase) * amplitude * Math.sin(x * 0.01 + phase * 0.5);
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Mirror effect for "audio" look
      ctx.beginPath();
      ctx.strokeStyle = color.replace('0.8', '0.2');
      for (let x = 0; x < width; x++) {
        const y = centerY - Math.sin(x * 0.02 + phase) * amplitude * Math.sin(x * 0.01 + phase * 0.5);
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      phase += speed;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [isListening, isSpeaking]);

  return (
    <div className="w-full h-32 rounded-xl bg-navy-medium/50 border border-white/5 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-transparent to-navy-dark z-10 pointer-events-none"></div>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};
