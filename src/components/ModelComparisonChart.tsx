
import React, { useState } from 'react';
import { 
  CartesianGrid, 
  Legend, 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis,
  BarChart,
  Bar
} from 'recharts';
import { ModelData } from '../data/models';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartBar, ChartLine, RefreshCw } from 'lucide-react';

interface ModelComparisonChartProps {
  models: ModelData[];
}

// Generate sample prediction data based on model accuracy
const generatePredictionData = (models: ModelData[]) => {
  const data = [];
  
  // Generate data points for 12 months
  for (let i = 0; i < 12; i++) {
    const monthData: { [key: string]: any } = {
      month: `Month ${i + 1}`,
    };
    
    // Add actual value (same for all models)
    const actualValue = 100 + (Math.sin(i / 2) * 20) + (i * 2);
    monthData.actual = parseFloat(actualValue.toFixed(2));
    
    // Add prediction for each model with error proportional to accuracy
    models.forEach(model => {
      const errorFactor = (1 - model.metrics.accuracy) * 0.3;
      const randomError = (Math.random() * 2 - 1) * errorFactor;
      const prediction = actualValue * (1 + randomError);
      monthData[model.id] = parseFloat(prediction.toFixed(2));
    });
    
    data.push(monthData);
  }
  
  return data;
};

// Generate metrics comparison data
const generateMetricsData = (models: ModelData[]) => {
  const metricKeys = ['accuracy', 'speed', 'consistency'];
  
  return metricKeys.map(metric => {
    const data: { [key: string]: any } = {
      name: metric.charAt(0).toUpperCase() + metric.slice(1),
    };
    
    models.forEach(model => {
      data[model.id] = model.metrics[metric as keyof typeof model.metrics] * 100;
    });
    
    return data;
  });
};

const ModelComparisonChart: React.FC<ModelComparisonChartProps> = ({ models }) => {
  const [chartData, setChartData] = useState(() => generatePredictionData(models));
  const [metricData, setMetricData] = useState(() => generateMetricsData(models));
  
  const regenerateData = () => {
    setChartData(generatePredictionData(models));
    setMetricData(generateMetricsData(models));
  };
  
  const getModelConfig = () => {
    const config: { [key: string]: any } = {
      actual: {
        label: 'Actual Value',
        color: '#94A3B8'
      }
    };
    
    models.forEach(model => {
      config[model.id] = {
        label: model.name,
        color: model.color
      };
    });
    
    return config;
  };
  
  return (
    <div className="w-full mt-6 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50 p-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-medium text-white">Performance Comparison</h3>
        <button 
          onClick={regenerateData}
          className="flex items-center gap-2 text-slate-400 bg-slate-700/60 px-3 py-1.5 rounded-md hover:text-white hover:bg-slate-700 transition-colors"
          title="Generate new sample data"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="text-sm">Regenerate</span>
        </button>
      </div>
      
      <Tabs defaultValue="line" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
          <TabsTrigger value="line" className="flex items-center gap-2">
            <ChartLine className="w-4 h-4" />
            <span>Prediction Accuracy</span>
          </TabsTrigger>
          <TabsTrigger value="bar" className="flex items-center gap-2">
            <ChartBar className="w-4 h-4" />
            <span>Metrics Comparison</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="line" className="pt-2">
          <div className="w-full h-80">
            <ChartContainer config={getModelConfig()}>
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                
                <ChartTooltip
                  content={
                    <ChartTooltipContent className="bg-slate-800 border-slate-700" />
                  }
                />
                
                <Legend />
                
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 8 }}
                />
                
                {models.map(model => (
                  <Line 
                    key={model.id}
                    type="monotone" 
                    dataKey={model.id} 
                    stroke={model.color}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                ))}
              </LineChart>
            </ChartContainer>
          </div>
        </TabsContent>
        
        <TabsContent value="bar" className="pt-2">
          <div className="w-full h-80">
            <ChartContainer config={getModelConfig()}>
              <BarChart
                data={metricData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                
                <ChartTooltip
                  content={
                    <ChartTooltipContent className="bg-slate-800 border-slate-700" />
                  }
                />
                
                <Legend />
                
                {models.map((model) => (
                  <Bar 
                    key={model.id} 
                    dataKey={model.id} 
                    fill={model.color} 
                    name={model.name}
                    radius={[4, 4, 0, 0]}
                  />
                ))}
              </BarChart>
            </ChartContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ModelComparisonChart;
