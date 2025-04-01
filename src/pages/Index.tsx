
import React, { useRef, useEffect } from 'react';
import { ArrowDown, TrendingUp } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SpinWheel from '../components/SpinWheel';
import TradingBackground from '../components/TradingBackground';
import LivePrediction from '../components/LivePrediction';
import { modelData } from '../data/models';

const Index: React.FC = () => {
  const spinWheelRef = useRef<HTMLDivElement>(null);
  
  const scrollToSpinWheel = () => {
    spinWheelRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-market-dark-blue to-market-dark overflow-hidden">
      <style jsx>{`
        @keyframes glow {
          0% { text-shadow: 0 0 5px rgba(255,255,255,0.5), 0 0 10px rgba(255,255,255,0.3); }
          50% { text-shadow: 0 0 10px rgba(255,255,255,0.7), 0 0 20px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3); }
          100% { text-shadow: 0 0 5px rgba(255,255,255,0.5), 0 0 10px rgba(255,255,255,0.3); }
        }
        .glow-text {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>

      <TradingBackground />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 min-h-screen flex flex-col justify-center items-center">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-market-teal to-blue-400 bg-clip-text text-transparent">
              Stock Market
            </span>
            <br />
            Price Prediction
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
          </div>
          
          {/* Live Prediction widget */}
          <div className="mt-8 mb-16 max-w-2xl mx-auto">
            <LivePrediction modelId="xgboost" />
          </div>
          
          <div className="animate-bounce text-slate-400 absolute bottom-4 left-1/2 -translate-x-1/2 cursor-pointer" onClick={scrollToSpinWheel}>
            <ArrowDown className="w-8 h-8" />
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-[20%] right-[10%] w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-lg opacity-30 animate-float" />
        <div className="absolute top-[60%] left-[15%] w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[30%] left-[8%] w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg opacity-25 animate-float" style={{ animationDelay: '2s' }} />
      </section>
      
      {/* Spin Wheel Section */}
      <section ref={spinWheelRef} className="py-20 px-6 min-h-screen flex flex-col justify-center">
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
          </div>
          
          <SpinWheel models={modelData} />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
