
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 px-6 bg-market-dark-blue/90 backdrop-blur-md border-t border-slate-700/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Market Prediction</h3>
            <p className="text-slate-400 text-sm">
              An advanced stock market prediction platform utilizing multiple machine learning models 
              to provide accurate price forecasts and insights.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
