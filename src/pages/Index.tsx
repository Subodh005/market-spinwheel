
import React, { useRef } from 'react';
import { ArrowDown, TrendingUp, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SpinWheel from '../components/SpinWheel';
import TradingBackground from '../components/TradingBackground';
import LivePrediction from '../components/LivePrediction';
import { modelData } from '../data/models';

// Add the glow animation to global styles via a style element
const glowAnimationStyle = `
  @keyframes glow {
    0% { text-shadow: 0 0 5px rgba(255,255,255,0.5), 0 0 10px rgba(255,255,255,0.3); }
    50% { text-shadow: 0 0 10px rgba(255,255,255,0.7), 0 0 20px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3); }
    100% { text-shadow: 0 0 5px rgba(255,255,255,0.5), 0 0 10px rgba(255,255,255,0.3); }
  }
  .glow-text {
    animation: glow 2s ease-in-out infinite;
  }
`;

const scrollToSpinWheel = () => {
  const spinWheelElement = document.getElementById('spin-wheel-section');
  if (spinWheelElement) {
    spinWheelElement.scrollIntoView({ behavior: 'smooth' });
  }
};

const Index: React.FC = () => {
  const spinWheelRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-market-dark-blue to-market-dark overflow-hidden">
      {/* Add the animation styles using a regular style tag without jsx attribute */}
      <style dangerouslySetInnerHTML={{ __html: glowAnimationStyle }} />
      
      <TradingBackground />
      <Header />
      
      <section className="relative pt-32 pb-20 px-6 min-h-screen">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-market-teal to-blue-400 bg-clip-text text-transparent">
              Stock Market
            </span>
            <br />
            PRICE PREDICTION
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Utilizing advanced machine learning models to predict stock market trends
            with high accuracy and reliability.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button 
              onClick={scrollToSpinWheel}
              className="px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-market-teal to-blue-500 text-white shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] hover:scale-105 transition-all"
            >
              Explore Models
            </button>

            <Link 
              to="/compare"
              className="px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:scale-105 transition-all flex items-center gap-2"
            >
              <BarChart2 className="w-5 h-5" />
              Compare Models
            </Link>
          </div>
          
          {/* Live Prediction widget */}
          <div className="mt-8 mb-16 max-w-2xl mx-auto">
            <LivePrediction modelId="xgboost" />
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-[20%] right-[10%] w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-lg opacity-30 animate-float" />
        <div className="absolute top-[60%] left-[15%] w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[30%] left-[8%] w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg opacity-25 animate-float" style={{ animationDelay: '2s' }} />
        
        {/* Move the arrow outside of the box and position it at the bottom of the viewport */}
        <div className="animate-bounce text-slate-400 absolute bottom-0 left-1/2 -translate-x-1/2 transform translate-y-8 cursor-pointer" onClick={scrollToSpinWheel}>
          <ArrowDown className="w-8 h-8" />
        </div>
      </section>
      
      <section id="spin-wheel-section" ref={spinWheelRef} className="py-20 px-6 min-h-screen flex flex-col justify-center">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-0.5 w-10 bg-market-teal/60" />
              <TrendingUp className="w-6 h-6 text-market-teal" />
              <div className="h-0.5 w-10 bg-market-teal/60" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Select a Prediction Model
            </h2>
            
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Spin the wheel to explore different machine learning models and their 
              prediction accuracy for stock market prices.
            </p>
            
            <div className="mt-4">
              <Link 
                to="/compare"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
              >
                <BarChart2 className="w-4 h-4" />
                <span>Or compare multiple models side-by-side</span>
              </Link>
            </div>
          </div>
          
          <SpinWheel models={modelData} />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
