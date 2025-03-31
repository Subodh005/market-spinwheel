
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface LivePredictionProps {
  modelId?: string; // Optional model ID to use for prediction
}

const LivePrediction: React.FC<LivePredictionProps> = ({ modelId = 'xgboost' }) => {
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  
  // Function to get a more accurate Apple stock price
  // Using a more realistic baseline around the recent trading range (~$170-180)
  const fetchCurrentPrice = () => {
    // Base price around $175 with smaller variations to be more realistic
    const basePrice = 175.25;
    const variation = (Math.random() * 5) - 2.5; // Random variation between -2.5 and +2.5
    return parseFloat((basePrice + variation).toFixed(2));
  };
  
  // Function to simulate prediction from our model
  // In a real app, this would call your backend with the actual model
  const getPrediction = (price: number, modelId: string) => {
    // Simulate different prediction behaviors for different models
    const models: Record<string, number> = {
      'linear-regression': 0.03,
      'decision-tree': 0.04,
      'random-forest': 0.025,
      'neural-network': 0.05,
      'logistic-regression': 0.02,
      'naive-bayes': 0.025,
      'knn': 0.03,
      'cnn': 0.035,
      'lstm': 0.03,
    };
    
    // Use the specified model's coefficient, or default to a standard value
    const volatility = models[modelId] || 0.02;
    
    // Apply a slight positive bias to the prediction (models tend to predict growth)
    const trend = Math.random() > 0.3 ? 1 : -1; // 70% chance of positive trend
    const predictedValue = price * (1 + trend * volatility * Math.random());
    return parseFloat(predictedValue.toFixed(2));
  };
  
  const refreshData = () => {
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      try {
        const price = fetchCurrentPrice();
        setCurrentPrice(price);
        setPredictedPrice(getPrediction(price, modelId));
        setLastUpdated(new Date());
        toast.success('Price data updated');
      } catch (error) {
        toast.error('Failed to update price data');
      } finally {
        setLoading(false);
      }
    }, 1200);
  };
  
  useEffect(() => {
    // Initial data fetch
    refreshData();
    
    // Auto-refresh every 60 seconds
    const interval = setInterval(refreshData, 60000);
    return () => clearInterval(interval);
  }, [modelId]);
  
  // Calculate if prediction is higher or lower than current price
  const isPredictionHigher = predictedPrice !== null && currentPrice !== null && predictedPrice > currentPrice;
  const priceDifference = currentPrice && predictedPrice ? ((predictedPrice - currentPrice) / currentPrice * 100).toFixed(2) : null;
  
  return (
    <div className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-market-teal/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">
          Live AAPL Prediction
          <span className="ml-2 text-sm font-normal text-slate-400">
            using {modelId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </span>
        </h3>
        <button 
          onClick={refreshData} 
          disabled={loading}
          className={`p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors ${loading ? 'animate-spin' : ''}`}
        >
          <RefreshCw className="w-4 h-4 text-slate-300" />
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-4">
        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="text-sm text-slate-400 mb-1">Current Price</div>
          <div className="text-2xl font-bold text-white">
            {currentPrice ? `$${currentPrice.toFixed(2)}` : '...'}
          </div>
        </div>
        
        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="text-sm text-slate-400 mb-1">Predicted Next</div>
          <div className="text-2xl font-bold flex items-center">
            <span className={isPredictionHigher ? 'text-green-400' : 'text-red-400'}>
              {predictedPrice ? `$${predictedPrice.toFixed(2)}` : '...'}
            </span>
            
            {priceDifference && (
              <span 
                className={`ml-2 flex items-center text-sm ${isPredictionHigher ? 'text-green-400' : 'text-red-400'}`}
              >
                {isPredictionHigher ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                {priceDifference}%
              </span>
            )}
          </div>
        </div>
      </div>
      
      {lastUpdated && (
        <div className="text-xs text-slate-500 text-right">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};

export default LivePrediction;
