
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModelData } from '../data/models';
import { ChevronRight, Award } from 'lucide-react';

interface SpinWheelProps {
  models: ModelData[];
}

const SpinWheel: React.FC<SpinWheelProps> = ({ models }) => {
  // Use All Available Models Instead of Limiting to 5
  const displayModels = models;
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ModelData | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const totalModels = displayModels.length;
  const segmentAngle = 360 / totalModels;
  
  // Find the model with the best accuracy
  const bestModel = displayModels.reduce((best, current) => 
    current.metrics.accuracy > best.metrics.accuracy ? current : best,
    displayModels[0]
  );
  
  const spinWheel = () => {
    if (spinning) return;
    
    setSpinning(true);
    
    // Random rotation between 2 and 5 full spins + offset to land on a segment
    const spinCount = 2 + Math.random() * 3;
    const randomOffset = Math.floor(Math.random() * totalModels);
    const newRotation = rotation + (spinCount * 360) + (randomOffset * segmentAngle);
    
    setRotation(newRotation);
    
    // Calculate which model will be selected
    const normalizedRotation = newRotation % 360;
    const selectedIndex = Math.floor(((360 - normalizedRotation) % 360) / segmentAngle) % totalModels;
    
    // Wait for the spin to finish then set the selected model
    setTimeout(() => {
      setSelectedModel(displayModels[selectedIndex]);
      setSpinning(false);
    }, 3000);
  };
  
  const handleModelSelect = (modelId: string) => {
    if (spinning) return;
    navigate(`/models/${modelId}`);
  };
  
  useEffect(() => {
    if (selectedModel) {
      const timer = setTimeout(() => {
        navigate(`/models/${selectedModel.id}`);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [selectedModel, navigate]);

  return (
    <div className="flex flex-col items-center justify-center gap-8 my-12">
      <div className="relative w-full max-w-xl aspect-square">
        {/* Wheel container with perspective */}
        <div 
          ref={wheelRef}
          className="relative w-full h-full rounded-full shadow-[0_0_40px_rgba(14,165,233,0.3)] transition-transform duration-[3000ms] ease-out transform-gpu"
          style={{ 
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? 'transform 3s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none'
          }}
        >
          {displayModels.map((model, index) => {
            const startAngle = index * segmentAngle;
            const endAngle = (index + 1) * segmentAngle;
            const middleAngle = startAngle + segmentAngle / 2;
            
            return (
              <div
                key={model.id}
                className="wheel-segment absolute top-0 left-0 w-full h-full cursor-pointer"
                style={{
                  clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((startAngle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((startAngle - 90) * Math.PI / 180)}%, ${50 + 50 * Math.cos((endAngle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((endAngle - 90) * Math.PI / 180)}%)`,
                  background: `linear-gradient(${startAngle}deg, ${model.color}dd, ${model.color}99)`,
                }}
                onClick={() => handleModelSelect(model.id)}
              >
                {/* Model name label - Adjusted position to move much further upward */}
                <div 
                  className="absolute w-full flex items-center justify-center z-50 select-none"
                  style={{
                    height: '100%',
                    transformOrigin: 'center',
                    transform: `rotate(${middleAngle}deg)`,
                  }}
                >
                  <div
                    className="font-bold text-white whitespace-nowrap"
                    style={{
                      transform: `translate(0, -180px) rotate(${-middleAngle}deg)`, // Changed from -160px to -180px to increase spacing even more
                      textShadow: '0 0 10px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5), 0 0 30px rgba(0,0,0,0.3)',
                      fontSize: 'clamp(1rem, 3vw, 1.5rem)', // Slightly increased font size
                      maxWidth: '150px',
                      overflow: 'visible',
                      letterSpacing: '-0.02em',
                      padding: '4px 8px',
                      backgroundColor: 'rgba(0,0,0,0.4)',
                      borderRadius: '4px',
                    }}
                  >
                    {model.shortName || model.name}
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Center point */}
          <div 
            className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 bg-market-dark-blue rounded-full border-4 border-white/10 shadow-lg z-10 flex items-center justify-center"
          >
            <div className="w-4 h-4 bg-market-teal rounded-full animate-pulse-glow" />
          </div>
        </div>
        
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-8 h-8 text-market-teal z-30">
          <ChevronRight className="w-8 h-8 -rotate-90" />
        </div>
      </div>
      
      <button
        onClick={spinWheel}
        disabled={spinning}
        className={`px-8 py-3 rounded-full text-lg font-bold transition-all ${
          spinning 
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-market-teal to-market-blue text-white shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] hover:scale-105'
        }`}
      >
        {spinning ? 'Spinning...' : selectedModel ? 'Spin Again' : 'Spin the Wheel'}
      </button>
      
      {selectedModel && (
        <div className="text-center mt-4 animate-fade-in">
          <p className="text-xl font-bold text-white">
            Selected: <span style={{ color: selectedModel.color }}>{selectedModel.name}</span>
          </p>
          <p className="text-sm text-slate-400 mt-1">Redirecting to model details...</p>
        </div>
      )}
      
      {/* Add information about the best model */}
      <div className="text-center mt-2 mb-6">
        <p className="text-base text-slate-300">
          <Award className="inline-block w-5 h-5 mr-1 text-yellow-300" />
          <span className="text-yellow-300 font-medium text-lg">{bestModel.name}</span> has the highest accuracy at {(bestModel.metrics.accuracy * 100).toFixed(1)}%
        </p>
      </div>
    </div>
  );
};

export default SpinWheel;
