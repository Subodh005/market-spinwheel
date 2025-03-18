
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BarChart3, TrendingUp, Brain, LineChart, Target, Award } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-market-dark-blue to-market-dark">
      <Header />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <section className="mb-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              About the Project
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Learn more about our stock market prediction platform, the technologies behind it,
              and how it can help you make better investment decisions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <FeatureCard 
              icon={<Brain className="w-10 h-10 text-market-teal" />}
              title="Machine Learning Driven"
              description="Leveraging advanced machine learning algorithms to analyze historical data and predict future stock prices with high accuracy."
            />
            
            <FeatureCard 
              icon={<BarChart3 className="w-10 h-10 text-purple-400" />}
              title="Multiple Models"
              description="Compare performance across 9+ prediction models, including Linear Regression, Neural Networks, LSTM, Random Forest, and more."
            />
            
            <FeatureCard 
              icon={<LineChart className="w-10 h-10 text-blue-400" />}
              title="Comprehensive Analysis"
              description="Visualize model performance with intuitive charts and detailed metrics including accuracy, MSE, RMSE, and more."
            />
            
            <FeatureCard 
              icon={<TrendingUp className="w-10 h-10 text-green-400" />}
              title="Real-time Predictions"
              description="Get up-to-date predictions based on the most recent market data, helping you stay ahead of market trends."
            />
            
            <FeatureCard 
              icon={<Target className="w-10 h-10 text-red-400" />}
              title="Model Comparison"
              description="Easily compare different models to find which one works best for specific market conditions or stock types."
            />
            
            <FeatureCard 
              icon={<Award className="w-10 h-10 text-yellow-400" />}
              title="Research Backed"
              description="Built on solid financial and statistical research principles, ensuring reliable and trustworthy predictions."
            />
          </div>
        </section>
        
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              How It Works
            </h2>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-market-teal/30 hidden md:block"></div>
            
            <div className="space-y-12">
              <TimelineItem 
                number="01"
                title="Data Collection"
                description="We collect historical stock data from reliable sources, including price, volume, and market indicators spanning several years."
                align="right"
              />
              
              <TimelineItem 
                number="02"
                title="Preprocessing"
                description="Raw data is cleaned, normalized, and transformed to extract meaningful features that influence stock prices."
                align="left"
              />
              
              <TimelineItem 
                number="03"
                title="Model Training"
                description="Multiple machine learning algorithms are trained on historical data to recognize patterns and relationships."
                align="right"
              />
              
              <TimelineItem 
                number="04"
                title="Validation & Testing"
                description="Models are validated and tested against unseen data to ensure they generalize well to real-world scenarios."
                align="left"
              />
              
              <TimelineItem 
                number="05"
                title="Performance Evaluation"
                description="We evaluate each model using metrics like accuracy, MSE, RMSE, and MAE to determine their predictive power."
                align="right"
              />
              
              <TimelineItem 
                number="06"
                title="Prediction Generation"
                description="The best-performing models are used to generate future price predictions for selected stocks."
                align="left"
              />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50 p-6 transition-all hover:transform hover:-translate-y-2 hover:shadow-lg">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-300">{description}</p>
    </div>
  );
};

interface TimelineItemProps {
  number: string;
  title: string;
  description: string;
  align: 'left' | 'right';
}

const TimelineItem: React.FC<TimelineItemProps> = ({ number, title, description, align }) => {
  return (
    <div className="flex flex-col md:flex-row items-center">
      <div className={`md:w-1/2 ${align === 'right' ? 'md:pr-12 md:text-right' : 'md:order-last md:pl-12'}`}>
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50 p-6">
          <div className="flex items-center mb-3 md:justify-start">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-market-teal text-black font-bold text-sm mr-3">
              {number}
            </div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
          <p className="text-slate-300">{description}</p>
        </div>
      </div>
      
      <div className="hidden md:flex md:w-10 md:justify-center md:relative">
        <div className="w-5 h-5 rounded-full bg-market-teal z-10"></div>
      </div>
      
      <div className={`hidden md:block md:w-1/2 ${align === 'right' ? 'md:order-last md:pl-12' : 'md:pr-12'}`}></div>
    </div>
  );
};

export default About;
