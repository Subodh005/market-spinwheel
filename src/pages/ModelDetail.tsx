
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, LineChart, Share2, Download } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ModelChart from '../components/ModelChart';
import MetricsCard from '../components/MetricsCard';
import FeatureComparison from '../components/FeatureComparison';
import LivePrediction from '../components/LivePrediction';
import { modelData } from '../data/models';
import { toast } from 'sonner';

const ModelDetail: React.FC = () => {
  const { modelId } = useParams<{ modelId: string }>();
  const navigate = useNavigate();
  const [model, setModel] = useState(modelData.find(m => m.id === modelId));
  
  useEffect(() => {
    // Find the model data based on URL param
    const selectedModel = modelData.find(m => m.id === modelId);
    
    if (selectedModel) {
      setModel(selectedModel);
      document.title = `${selectedModel.name} - Stock Prediction`;
    } else {
      // If model not found, redirect to home
      toast.error("Model not found");
      navigate('/');
    }
  }, [modelId, navigate]);
  
  if (!model) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-market-dark-blue">
        <div className="p-6 bg-slate-800 rounded-lg shadow-lg">
          <h2 className="text-xl text-white">Loading model data...</h2>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-market-dark-blue to-market-dark">
      <Header />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Back button and page header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Models
          </button>
          
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: `${model.color}33`, color: model.color }}>
                <LineChart className="w-3 h-3 mr-1" />
                ML Model
              </div>
              
              <h1 className="text-3xl font-bold text-white mt-2">{model.name}</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                onClick={() => toast.success("Link copied to clipboard!")}
              >
                <Share2 className="w-5 h-5" />
              </button>
              
              <button 
                className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                onClick={() => toast.success("Report downloaded!")}
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Model description */}
        <div className="mb-8 p-6 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50">
          <p className="text-slate-300 leading-relaxed">
            {model.description}
          </p>
        </div>
        
        {/* Live prediction for this model */}
        <div className="mb-8">
          <LivePrediction modelId={model.id} />
        </div>
        
        {/* Charts and metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ModelChart model={model} />
          <MetricsCard model={model} />
        </div>
        
        {/* Features and comparison */}
        <div className="mb-8">
          <FeatureComparison model={model} />
        </div>
        
        {/* Related models */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Other Models You Might Like</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modelData
              .filter(m => m.id !== model.id)
              .slice(0, 3)
              .map(m => (
                <div 
                  key={m.id}
                  className="model-card p-4 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50 cursor-pointer"
                  onClick={() => navigate(`/models/${m.id}`)}
                >
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: m.color }} />
                    <h4 className="text-white font-medium">{m.name}</h4>
                  </div>
                  <p className="text-sm text-slate-400 mb-3 line-clamp-2">{m.description}</p>
                  <div className="flex items-center text-xs text-slate-300">
                    <span className="font-medium text-slate-200">Accuracy:</span>
                    <span className="ml-1">{(m.metrics.accuracy * 100).toFixed(1)}%</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ModelDetail;
