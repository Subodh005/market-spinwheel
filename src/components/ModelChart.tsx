
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ModelData } from '../data/models';

interface ModelChartProps {
  model: ModelData;
}

// Generate sample stock price data based on model accuracy
const generateMockData = (model: ModelData) => {
  const data = [];
  const basePrice = 100;
  let actualPrice = basePrice;
  let predictedPrice = basePrice;
  
  // Create more accurate predictions for models with higher accuracy
  const volatility = 0.05; // Base volatility
  const predictionError = 0.1 * (1 - model.metrics.accuracy);
  
  for (let i = 0; i < 30; i++) {
    // Generate actual price movement
    const change = (Math.random() - 0.48) * volatility * basePrice;
    actualPrice += change;
    
    // Generate predicted price with error proportional to model accuracy
    const errorFactor = (Math.random() - 0.5) * predictionError * 2;
    predictedPrice = actualPrice * (1 + errorFactor);
    
    data.push({
      day: i + 1,
      actual: parseFloat(actualPrice.toFixed(2)),
      predicted: parseFloat(predictedPrice.toFixed(2))
    });
  }
  
  return data;
};

const ModelChart: React.FC<ModelChartProps> = ({ model }) => {
  const data = generateMockData(model);

  return (
    <div className="w-full h-80 bg-slate-800/50 p-4 rounded-lg backdrop-blur-sm border border-slate-700/50">
      <h3 className="text-lg font-semibold mb-4 text-white">Price Prediction Performance</h3>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="day" 
            label={{ value: 'Day', position: 'insideBottomRight', offset: -10, fill: '#9CA3AF' }}
            tick={{ fill: '#9CA3AF' }}
          />
          <YAxis 
            label={{ value: 'Price ($)', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
            tick={{ fill: '#9CA3AF' }}
            domain={['dataMin - 5', 'dataMax + 5']}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '0.375rem' }}
            itemStyle={{ color: '#E5E7EB' }}
            labelStyle={{ color: '#9CA3AF' }}
          />
          <Legend wrapperStyle={{ color: '#E5E7EB' }} />
          <Line 
            type="monotone" 
            dataKey="actual" 
            stroke="#0284C7" 
            name="Actual Price"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 8 }}
          />
          <Line 
            type="monotone" 
            dataKey="predicted" 
            stroke={model.color} 
            name="Predicted Price"
            strokeWidth={2}
            strokeDasharray="3 3"
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ModelChart;
