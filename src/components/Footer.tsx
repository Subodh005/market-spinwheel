
import React from 'react';
import { GitHub, Mail, Link as LinkIcon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 px-6 bg-market-dark-blue/90 backdrop-blur-md border-t border-slate-700/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">StockPredict</h3>
            <p className="text-slate-400 text-sm">
              An advanced stock market prediction platform utilizing multiple machine learning models 
              to provide accurate price forecasts and insights.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-slate-400 hover:text-market-teal transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/models" className="text-slate-400 hover:text-market-teal transition-colors">
                  Models
                </a>
              </li>
              <li>
                <a href="/about" className="text-slate-400 hover:text-market-teal transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                aria-label="GitHub"
              >
                <GitHub className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                aria-label="Website"
              >
                <LinkIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-slate-700/50 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} StockPredict. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
