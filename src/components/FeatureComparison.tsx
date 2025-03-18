
import React from 'react';
import { ModelData } from '../data/models';
import { CheckCircle2, XCircle } from 'lucide-react';

interface FeatureComparisonProps {
  model: ModelData;
}

const FeatureComparison: React.FC<FeatureComparisonProps> = ({ model }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50 overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-medium text-white mb-4">Model Analysis</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-green-400 mb-2 uppercase tracking-wider">Advantages</h4>
            <ul className="space-y-2">
              {model.advantages.map((advantage, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300">{advantage}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-red-400 mb-2 uppercase tracking-wider">Limitations</h4>
            <ul className="space-y-2">
              {model.limitations.map((limitation, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300">{limitation}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="text-sm font-medium text-blue-400 mb-2 uppercase tracking-wider">Key Features</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {model.features.map((feature, idx) => (
              <div 
                key={idx} 
                className="bg-slate-700/50 px-3 py-2 rounded text-sm text-slate-300 border border-slate-600/50"
              >
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureComparison;
