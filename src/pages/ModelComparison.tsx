
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ComparisonTable from '../components/ComparisonTable';
import ModelSelector from '../components/ModelSelector';
import ModelComparisonChart from '../components/ModelComparisonChart';
import { modelData, ModelData } from '../data/models';
import { ArrowLeft, BarChart, Columns2 } from 'lucide-react';
import { toast } from 'sonner';
import { ScrollArea } from '../components/ui/scroll-area';

const ModelComparison: React.FC = () => {
  const [selectedModels, setSelectedModels] = useState<ModelData[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const navigate = useNavigate();
  
  const handleAddModel = (modelId: string) => {
    const model = modelData.find(m => m.id === modelId);
    
    if (!model) return;
    
    // Check if model is already selected
    if (selectedModels.some(m => m.id === modelId)) {
      toast.error(`${model.name} is already in comparison`);
      return;
    }
    
    // Limit to comparing 2 models at most (changed from 4)
    if (selectedModels.length >= 2) {
      toast.error("You can compare up to 2 models at once");
      return;
    }
    
    setSelectedModels([...selectedModels, model]);
    toast.success(`Added ${model.name} to comparison`);
  };
  
  const handleRemoveModel = (modelId: string) => {
    setSelectedModels(selectedModels.filter(model => model.id !== modelId));
  };
  
  const handleClearAll = () => {
    setSelectedModels([]);
    toast.info("Cleared all models from comparison");
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-market-dark-blue to-market-dark overflow-y-auto">
      <Header />
      
      <ScrollArea className="h-[calc(100vh-64px)]">
        <div className="container max-w-7xl mx-auto px-4 py-8 pt-20">
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-slate-300 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
            
            <div className="h-6 w-px bg-slate-700 mx-2" />
            
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              <span className="bg-gradient-to-r from-market-teal to-blue-400 bg-clip-text text-transparent">
                Model Comparison
              </span>
            </h1>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="md:col-span-1">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50 p-4">
                <h2 className="text-xl font-semibold text-white mb-4">Select Models</h2>
                <ModelSelector 
                  onSelectModel={handleAddModel} 
                  selectedModelIds={selectedModels.map(m => m.id)}
                />
                
                {selectedModels.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-md font-medium text-white mb-3">Selected Models:</h3>
                    <div className="space-y-2">
                      {selectedModels.map(model => (
                        <div 
                          key={model.id}
                          className="flex items-center justify-between p-3 bg-slate-700/40 rounded-md border border-slate-600/50"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: model.color }} />
                            <span className="text-white">{model.name}</span>
                          </div>
                          <button 
                            onClick={() => handleRemoveModel(model.id)} 
                            className="text-slate-400 hover:text-white"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={handleClearAll}
                      className="mt-4 w-full py-2 px-4 bg-slate-700/50 text-slate-300 rounded hover:bg-slate-700 transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50 p-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">Comparison Results</h2>
                  
                  <div className="flex items-center gap-2 p-1 bg-slate-700/60 rounded-md">
                    <button
                      onClick={() => setViewMode('table')}
                      className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-slate-600 text-white' : 'text-slate-400'}`}
                      title="Table View"
                    >
                      <BarChart className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-slate-600 text-white' : 'text-slate-400'}`}
                      title="Grid View"
                    >
                      <Columns2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                {selectedModels.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="text-slate-400 mb-4 text-6xl">⚖️</div>
                    <h3 className="text-xl font-medium text-white mb-2">No Models Selected</h3>
                    <p className="text-slate-400 max-w-md">
                      Select models from the panel on the left to start comparing their features and performance metrics.
                    </p>
                  </div>
                ) : (
                  <>
                    <ModelComparisonChart models={selectedModels} />
                    <ComparisonTable 
                      models={selectedModels}
                      viewMode={viewMode}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default ModelComparison;
