
import React from 'react';
import { CheckIcon } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { modelData } from '../data/models';

interface ModelSelectorProps {
  onSelectModel: (modelId: string) => void;
  selectedModelIds: string[];
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ 
  onSelectModel,
  selectedModelIds
}) => {
  return (
    <div>
      <Select onValueChange={onSelectModel}>
        <SelectTrigger className="w-full bg-slate-700/40 border-slate-600">
          <SelectValue placeholder="Choose a model to compare" />
        </SelectTrigger>
        <SelectContent>
          {modelData.map(model => (
            <SelectItem 
              key={model.id} 
              value={model.id}
              disabled={selectedModelIds.includes(model.id)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: model.color }}
                />
                <span>{model.name}</span>
                {selectedModelIds.includes(model.id) && (
                  <CheckIcon className="w-4 h-4 ml-2 text-green-500" />
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <div className="mt-6">
        <h3 className="text-sm font-medium text-slate-300 mb-2">Quick Add</h3>
        <div className="grid grid-cols-2 gap-2">
          {modelData.slice(0, 6).map(model => (
            <button
              key={model.id}
              onClick={() => onSelectModel(model.id)}
              disabled={selectedModelIds.includes(model.id)}
              className={`p-2 text-sm rounded-md border text-left ${
                selectedModelIds.includes(model.id) 
                  ? 'bg-slate-700/50 border-slate-600/50 text-slate-400 cursor-not-allowed' 
                  : 'bg-slate-700/30 border-slate-600/30 text-white hover:bg-slate-700/70 hover:border-slate-500/70'
              }`}
              style={{
                borderLeftColor: model.color,
                borderLeftWidth: '3px'
              }}
            >
              {model.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelSelector;
