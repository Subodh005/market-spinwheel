
import React, { useState, useEffect } from 'react';
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

// Generate metrics comparison data - only for accuracy
const generateMetricsData = (models: ModelData[]) => {
  return [{
    name: "Accuracy",
    ...models.reduce((acc, model) => {
      acc[model.id] = model.metrics.accuracy * 100;
      return acc;
    }, {} as Record<string, number>)
  }];
};

const ModelComparisonChart: React.FC<ModelComparisonChartProps> = ({ models }) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [metricData, setMetricData] = useState<any[]>([]);
  
  // Update chart data when models change
  useEffect(() => {
    if (models.length > 0) {
      setChartData(generatePredictionData(models));
      setMetricData(generateMetricsData(models));
    }
  }, [models]);
  
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
  
  if (models.length === 0) {
    return null;
  }
  
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
            <span>Accuracy Comparison</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="line" className="pt-2">
          <div className="w-full h-80">
            <ChartContainer config={getModelConfig()}>
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 40, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month"
                  padding={{ left: 10, right: 10 }} 
                  tick={{ fontSize: 12 }}
                  tickMargin={10}
                />
                <YAxis 
                  domain={['dataMin - 5', 'dataMax + 5']} 
                  padding={{ top: 20, bottom: 20 }}
                  tick={{ fontSize: 12 }}
                  tickMargin={10}
                />
                
                <ChartTooltip
                  content={
                    <ChartTooltipContent className="bg-slate-800 border-slate-700" />
                  }
                />
                
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconSize={10}
                  iconType="circle"
                />
                
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
                    dot={{ fill: model.color, strokeWidth: 1, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                ))}
              </LineChart>
            </ChartContainer>
          </div>
          
          {/* Enhanced legend for better visibility */}
          <div className="flex flex-wrap justify-center gap-6 mt-6 pt-4 border-t border-slate-700/50">
            <div className="flex items-center gap-2">
              <div className="w-4 h-2 bg-slate-400 rounded-full"></div>
              <span className="text-sm text-slate-300">Actual</span>
            </div>
            {models.map(model => (
              <div key={model.id} className="flex items-center gap-2">
                <div className="w-4 h-2 rounded-full" style={{ backgroundColor: model.color }}></div>
                <span className="text-sm text-slate-300">{model.name}</span>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="bar" className="pt-2">
          <div className="w-full h-80">
            <ChartContainer config={getModelConfig()}>
              <BarChart
                data={metricData}
                margin={{ top: 20, right: 40, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  tickMargin={10}
                />
                <YAxis 
                  domain={[0, 100]} 
                  tick={{ fontSize: 12 }}
                  tickMargin={10}
                />
                
                <ChartTooltip
                  content={
                    <ChartTooltipContent className="bg-slate-800 border-slate-700" />
                  }
                />
                
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconSize={10}
                  iconType="circle"
                />
                
                {models.map((model) => (
                  <Bar 
                    key={model.id} 
                    dataKey={model.id} 
                    fill={model.color} 
                    name={model.name}
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                    maxBarSize={60}
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
