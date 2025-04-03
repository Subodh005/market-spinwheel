
import React from 'react';
import { ModelData } from '../data/models';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, XCircle } from 'lucide-react';

interface ComparisonTableProps {
  models: ModelData[];
  viewMode: 'table' | 'grid';
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ 
  models,
  viewMode 
}) => {
  const metricsToShow = [
    { key: 'accuracy', label: 'Accuracy', format: (val: number) => `${(val * 100).toFixed(1)}%` },
    { key: 'mse', label: 'MSE', format: (val: number) => val.toFixed(3) },
    { key: 'mae', label: 'MAE', format: (val: number) => val?.toFixed(3) || 'N/A' },
    { key: 'rmse', label: 'RMSE', format: (val: number) => val?.toFixed(3) || 'N/A' },
    { key: 'r2', label: 'R²', format: (val: number) => val?.toFixed(2) || 'N/A' }
  ];
  
  if (viewMode === 'table') {
    return (
      <div className="overflow-x-auto">
        <Table className="w-full border-collapse">
          <TableHeader>
            <TableRow>
              <TableHead className="bg-slate-700/30 text-white">Feature</TableHead>
              {models.map(model => (
                <TableHead 
                  key={model.id} 
                  className="bg-slate-700/30 text-white"
                  style={{ borderBottom: `2px solid ${model.color}` }}
                >
                  {model.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Metrics Section */}
            <TableRow>
              <TableCell className="font-medium bg-slate-700/20" colSpan={models.length + 1}>
                Performance Metrics
              </TableCell>
            </TableRow>
            {metricsToShow.map(({ key, label, format }) => (
              <TableRow key={key}>
                <TableCell className="font-medium">{label}</TableCell>
                {models.map(model => (
                  <TableCell key={`${model.id}-${key}`} className="text-center">
                    {format(model.metrics[key as keyof typeof model.metrics] as number)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            
            {/* Features Section */}
            <TableRow>
              <TableCell className="font-medium bg-slate-700/20" colSpan={models.length + 1}>
                Features
              </TableCell>
            </TableRow>
            {/* Get all unique features across models */}
            {Array.from(new Set(models.flatMap(model => model.features))).map(feature => (
              <TableRow key={feature}>
                <TableCell className="font-medium">{feature}</TableCell>
                {models.map(model => (
                  <TableCell key={`${model.id}-${feature}`} className="text-center">
                    {model.features.includes(feature) ? (
                      <CheckCircle2 className="inline w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="inline w-5 h-5 text-red-500/70" />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            
            {/* Advantages Section */}
            <TableRow>
              <TableCell className="font-medium bg-slate-700/20" colSpan={models.length + 1}>
                Advantages
              </TableCell>
            </TableRow>
            {models.map(model => (
              <TableRow key={`${model.id}-advantages`}>
                <TableCell className="font-medium">{model.name}</TableCell>
                <TableCell colSpan={models.length} className="px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    {model.advantages.map((adv, idx) => (
                      <li key={idx}>{adv}</li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
            ))}
            
            {/* Limitations Section */}
            <TableRow>
              <TableCell className="font-medium bg-slate-700/20" colSpan={models.length + 1}>
                Limitations
              </TableCell>
            </TableRow>
            {models.map(model => (
              <TableRow key={`${model.id}-limitations`}>
                <TableCell className="font-medium">{model.name}</TableCell>
                <TableCell colSpan={models.length} className="px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    {model.limitations.map((lim, idx) => (
                      <li key={idx}>{lim}</li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
  
  // Grid view
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {models.map(model => (
        <div 
          key={model.id}
          className="bg-slate-700/30 border border-slate-600/50 rounded-lg overflow-hidden"
          style={{ borderTopColor: model.color, borderTopWidth: '3px' }}
        >
          <div className="p-4">
            <h3 className="text-xl font-medium text-white mb-2">{model.name}</h3>
            <p className="text-slate-300 mb-4">{model.description}</p>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              {metricsToShow.map(({ key, label, format }) => (
                <div key={key} className="bg-slate-800/50 p-3 rounded">
                  <div className="text-sm text-slate-400">{label}</div>
                  <div className="text-xl font-medium text-white">
                    {format(model.metrics[key as keyof typeof model.metrics] as number)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-blue-400 mb-2">Key Features</h4>
              <div className="flex flex-wrap gap-2">
                {model.features.map((feature, idx) => (
                  <span 
                    key={idx}
                    className="px-2 py-1 bg-slate-800/60 text-slate-300 text-sm rounded"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <h4 className="text-sm font-medium text-green-400 mb-2">Advantages</h4>
                <ul className="list-disc pl-5 space-y-1 text-slate-300 text-sm">
                  {model.advantages.map((adv, idx) => (
                    <li key={idx}>{adv}</li>
                  ))}
                </ul>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-red-400 mb-2">Limitations</h4>
                <ul className="list-disc pl-5 space-y-1 text-slate-300 text-sm">
                  {model.limitations.map((lim, idx) => (
                    <li key={idx}>{lim}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComparisonTable;
