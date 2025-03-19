
import React, { useEffect, useRef } from 'react';

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
  speed: number;
  color: string;
  width: number;
}

interface Candle {
  x: number;
  y: number;
  width: number;
  height: number;
  isPositive: boolean;
  opacity: number;
  speed: number;
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
    
    // Create initial lines (price movements)
    const lines: Line[] = [];
    const lineCount = Math.floor(window.innerWidth / 40);
    
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
        color: colors[Math.floor(Math.random() * colors.length)],
        width: 1 + Math.random() * 2
      });
    }
    
    // Create candlesticks
    const candles: Candle[] = [];
    const candleCount = Math.floor(window.innerWidth / 100);
    
    for (let i = 0; i < candleCount; i++) {
      const isPositive = Math.random() > 0.5;
      candles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: 8 + Math.random() * 15,
        height: 20 + Math.random() * 60,
        isPositive: isPositive,
        opacity: 0.05 + Math.random() * 0.15,
        speed: 0.3 + Math.random() * 0.7
      });
    }
    
    // Animation frame
    let animationFrameId: number;
    
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid (chart background)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      
      // Horizontal grid lines
      const gridGap = 50;
      for (let y = 0; y < canvas.height; y += gridGap) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Vertical grid lines
      for (let x = 0; x < canvas.width; x += gridGap) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Draw candlesticks
      candles.forEach(candle => {
        ctx.fillStyle = candle.isPositive 
          ? `rgba(22, 163, 74, ${candle.opacity})` 
          : `rgba(220, 38, 38, ${candle.opacity})`;
        
        // Draw candle body
        ctx.fillRect(candle.x, candle.y, candle.width, candle.height);
        
        // Draw wicks
        ctx.beginPath();
        ctx.strokeStyle = candle.isPositive 
          ? `rgba(22, 163, 74, ${candle.opacity + 0.1})` 
          : `rgba(220, 38, 38, ${candle.opacity + 0.1})`;
        ctx.lineWidth = 2;
        const centerX = candle.x + candle.width / 2;
        // Top wick
        ctx.moveTo(centerX, candle.y - candle.height * 0.3);
        ctx.lineTo(centerX, candle.y);
        // Bottom wick
        ctx.moveTo(centerX, candle.y + candle.height);
        ctx.lineTo(centerX, candle.y + candle.height + candle.height * 0.3);
        ctx.stroke();
        
        // Move candles down
        candle.y += candle.speed;
        
        // Reset candles that go out of view
        if (candle.y > canvas.height) {
          candle.y = -candle.height;
          candle.x = Math.random() * canvas.width;
          candle.isPositive = Math.random() > 0.5;
          candle.width = 8 + Math.random() * 15;
          candle.height = 20 + Math.random() * 60;
        }
      });
      
      // Draw trend lines
      lines.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.strokeStyle = line.color + Math.floor(line.opacity * 255).toString(16).padStart(2, '0');
        ctx.lineWidth = line.width;
        ctx.stroke();
        
        // Move lines down
        line.y1 += line.speed;
        line.y2 += line.speed;
        
        // Reset lines that go out of view
        if (line.y1 > canvas.height) {
          line.y1 = 0;
          line.y2 = 30 + Math.random() * 200;
          line.x1 = Math.random() * canvas.width;
          line.x2 = line.x1 + (Math.random() * 200 - 100);
          line.opacity = 0.1 + Math.random() * 0.3;
        }
      });
      
      // Add occasional price indicators
      if (Math.random() > 0.98) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const price = (100 + Math.random() * 900).toFixed(2);
        ctx.font = '12px monospace';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillText(`$${price}`, x, y);
      }
      
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
