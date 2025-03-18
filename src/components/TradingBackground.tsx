
import React, { useEffect, useRef } from 'react';

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
  speed: number;
  color: string;
}

const TradingBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Create initial lines
    const lines: Line[] = [];
    const lineCount = Math.floor(window.innerWidth / 50);
    
    const colors = [
      '#16A34A', // Green
      '#DC2626', // Red
      '#0D9488', // Teal
      '#0284C7', // Sky Blue
      '#4F46E5', // Indigo
    ];
    
    for (let i = 0; i < lineCount; i++) {
      const startX = Math.random() * canvas.width;
      const endX = startX + (Math.random() * 200 - 100);
      
      lines.push({
        x1: startX,
        y1: Math.random() * canvas.height,
        x2: endX,
        y2: Math.random() * canvas.height,
        opacity: 0.1 + Math.random() * 0.3,
        speed: 0.5 + Math.random() * 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    
    // Animation frame
    let animationFrameId: number;
    
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw lines
      lines.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.strokeStyle = line.color + Math.floor(line.opacity * 255).toString(16).padStart(2, '0');
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Move lines down
        line.y1 += line.speed;
        line.y2 += line.speed;
        
        // Reset lines that go out of view
        if (line.y1 > canvas.height) {
          line.y1 = 0;
          line.y2 = Math.random() * 200;
          line.x1 = Math.random() * canvas.width;
          line.x2 = line.x1 + (Math.random() * 200 - 100);
          line.opacity = 0.1 + Math.random() * 0.3;
        }
      });
      
      animationFrameId = window.requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default TradingBackground;
