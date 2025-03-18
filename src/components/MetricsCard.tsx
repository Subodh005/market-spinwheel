
import React from 'react';
import { ModelData } from '../data/models';
import { CheckCircle2, XCircle, LineChart, Target, TrendingDown, TrendingUp } from 'lucide-react';

interface MetricsCardProps {
  model: ModelData;
}

const MetricsCard: React.FC<MetricsCardProps> = ({ model }) => {
  const { metrics } = model;
  
  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 0.9) return "text-green-400";
    if (accuracy >= 0.8) return "text-blue-400";
    if (accuracy >= 0.7) return "text-yellow-400";
    return "text-red-400";
  };
  
  const getAccuracyIcon = (accuracy: number) => {
    if (accuracy >= 0.8) return <CheckCircle2 className="w-5 h-5 text-green-400" />;
    if (accuracy >= 0.7) return <Target className="w-5 h-5 text-yellow-400" />;
    return <XCircle className="w-5 h-5 text-red-400" />;
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50 overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-medium text-white mb-4">Model Performance Metrics</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-700/50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-slate-300">Accuracy</span>
            </div>
            <div className="flex items-baseline">
              <span className={`text-2xl font-bold ${getAccuracyColor(metrics.accuracy)}`}>
                {(metrics.accuracy * 100).toFixed(1)}%
              </span>
              <span className="ml-1 text-xs text-slate-400">
                {metrics.accuracy >= 0.9 ? '(Excellent)' : 
                  metrics.accuracy >= 0.8 ? '(Good)' : 
                  metrics.accuracy >= 0.7 ? '(Fair)' : '(Poor)'}
              </span>
            </div>
          </div>
          
          <div className="bg-slate-700/50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <LineChart className="w-4 h-4 text-red-400" />
              <span className="text-sm text-slate-300">MSE</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-red-400">
                {metrics.mse.toFixed(3)}
              </span>
              <span className="ml-1 text-xs text-slate-400">
                (Mean Squared Error)
              </span>
            </div>
          </div>
          
          {metrics.mae && (
            <div className="bg-slate-700/50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-slate-300">MAE</span>
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-purple-400">
                  {metrics.mae.toFixed(3)}
                </span>
                <span className="ml-1 text-xs text-slate-400">
                  (Mean Absolute Error)
                </span>
              </div>
            </div>
          )}
          
          {metrics.rmse && (
            <div className="bg-slate-700/50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-slate-300">RMSE</span>
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-yellow-400">
                  {metrics.rmse.toFixed(3)}
                </span>
                <span className="ml-1 text-xs text-slate-400">
                  (Root Mean Squared Error)
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;
