
export interface ModelMetrics {
  accuracy: number;
  mse: number;
  mae?: number;
  rmse?: number;
  r2?: number;
}

export interface ModelData {
  id: string;
  name: string;
  shortName: string;
  color: string;
  description: string;
  metrics: ModelMetrics;
  features: string[];
  advantages: string[];
  limitations: string[];
}

export const modelData: ModelData[] = [
  {
    id: "linear-regression",
    name: "Linear Regression",
    shortName: "LinReg",
    color: "#16A34A", // Green
    description: "A linear approach to modeling the relationship between a dependent variable and independent variables. This model is trained on historical Apple stock data to predict future stock prices based on linear relationships between features.",
    metrics: {
      accuracy: 0.76,
      mse: 0.043,
      mae: 0.162,
      rmse: 0.207,
      r2: 0.76
    },
    features: [
      "Simple and interpretable model",
      "Fast training and prediction",
      "Works well with linear relationships"
    ],
    advantages: [
      "Easy to understand and implement",
      "Computationally efficient",
      "Provides insights on feature importance"
    ],
    limitations: [
      "Assumes linear relationship between variables",
      "Sensitive to outliers",
      "Cannot capture complex patterns"
    ]
  },
  {
    id: "random-forest",
    name: "Random Forest",
    shortName: "RF",
    color: "#7E22CE", // Purple
    description: "An ensemble learning method that operates by constructing multiple decision trees during training. Our implementation uses 100 estimators to predict Apple stock prices with high accuracy.",
    metrics: {
      accuracy: 0.89,
      mse: 0.028,
      mae: 0.127,
      rmse: 0.167,
      r2: 0.89
    },
    features: [
      "Ensemble of decision trees",
      "Good for complex relationships",
      "Reduces overfitting"
    ],
    advantages: [
      "Generally has high accuracy",
      "Handles large datasets with higher dimensionality",
      "Less prone to overfitting than individual decision trees"
    ],
    limitations: [
      "Less interpretable than single decision trees",
      "Computationally intensive",
      "Can be slow for real-time predictions"
    ]
  },
  {
    id: "logistic-regression",
    name: "Logistic Regression",
    shortName: "LogReg",
    color: "#DC2626", // Red
    description: "A statistical method used for binary classification that estimates the probability of an event occurring. Our model is trained to predict whether Apple stock prices will increase or decrease in the next day.",
    metrics: {
      accuracy: 0.74,
      mse: 0.052,
      mae: 0.178,
      rmse: 0.228,
      r2: 0.74
    },
    features: [
      "Probability-based classification",
      "Simple and efficient",
      "Works well for linearly separable data"
    ],
    advantages: [
      "Provides probability scores",
      "Less prone to overfitting in high dimensions",
      "Fast training and inference"
    ],
    limitations: [
      "Assumes linear decision boundary",
      "Limited to binary or multinomial outcomes",
      "May underperform with complex nonlinear relationships"
    ]
  },
  {
    id: "naive-bayes",
    name: "Naive Bayes",
    shortName: "NB",
    color: "#9333EA", // Purple
    description: "A family of probabilistic algorithms based on applying Bayes' theorem with strong independence assumptions between features. Our Bernoulli Naive Bayes model predicts Apple stock movement direction.",
    metrics: {
      accuracy: 0.72,
      mse: 0.058,
      mae: 0.187,
      rmse: 0.241,
      r2: 0.72
    },
    features: [
      "Probabilistic classifier",
      "Works well with small datasets",
      "Fast training and prediction"
    ],
    advantages: [
      "Simple and easy to implement",
      "Works well with high-dimensional data",
      "Requires little training data"
    ],
    limitations: [
      "Assumes feature independence",
      "Can be outperformed by more sophisticated models",
      "Sensitive to irrelevant features"
    ]
  },
  {
    id: "knn",
    name: "K-Nearest Neighbors",
    shortName: "KNN",
    color: "#CA8A04", // Yellow
    description: "A non-parametric method used for classification and regression. Our KNN implementation uses clusters of similar price patterns to predict future Apple stock movements.",
    metrics: {
      accuracy: 0.81,
      mse: 0.038,
      mae: 0.152,
      rmse: 0.195,
      r2: 0.81
    },
    features: [
      "Instance-based learning",
      "No training phase",
      "Adapts to new data easily"
    ],
    advantages: [
      "Simple and intuitive algorithm",
      "No assumptions about data distribution",
      "Works well with multi-class problems"
    ],
    limitations: [
      "Computationally expensive for large datasets",
      "Sensitive to irrelevant features",
      "Requires feature scaling"
    ]
  },
  {
    id: "decision-tree",
    name: "Decision Tree",
    shortName: "D-Tree",
    color: "#EC4899", // Pink
    description: "A tree-like model of decisions that maps observations to conclusions about the target value. Our implementation predicts Apple stock prices with a focus on 100-day future predictions.",
    metrics: {
      accuracy: 0.82,
      mse: 0.036,
      mae: 0.148,
      rmse: 0.189,
      r2: 0.82
    },
    features: [
      "Non-linear modeling",
      "Handles categorical data well",
      "Easy to visualize and interpret"
    ],
    advantages: [
      "Can handle both numerical and categorical data",
      "No need for feature scaling",
      "Automatically handles feature interactions"
    ],
    limitations: [
      "Prone to overfitting",
      "Can be unstable with small data changes",
      "Limited expressiveness for complex relationships"
    ]
  },
  {
    id: "cnn",
    name: "Convolutional Neural Network",
    shortName: "CNN",
    color: "#F97316", // Orange
    description: "A deep learning algorithm that can take an input image, assign importance to various aspects, and differentiate one from the other. Our CNN model treats stock price sequences as 1D images to identify patterns for prediction.",
    metrics: {
      accuracy: 0.88,
      mse: 0.029,
      mae: 0.132,
      rmse: 0.17,
      r2: 0.88
    },
    features: [
      "Convolutional layers for pattern recognition",
      "Feature extraction capabilities",
      "Deep architecture"
    ],
    advantages: [
      "Automatically detects important features",
      "Reduces number of parameters compared to fully connected networks",
      "Effective at capturing local patterns"
    ],
    limitations: [
      "Requires large amounts of data",
      "Computationally expensive to train",
      "Complex to implement and tune"
    ]
  },
  {
    id: "lstm",
    name: "Long Short-Term Memory",
    shortName: "LSTM",
    color: "#0EA5E9", // Blue
    description: "A special kind of recurrent neural network capable of learning long-term dependencies. Our LSTM model is designed to remember patterns in Apple stock prices over extended time periods for more accurate predictions.",
    metrics: {
      accuracy: 0.90,
      mse: 0.025,
      mae: 0.121,
      rmse: 0.158,
      r2: 0.90
    },
    features: [
      "Memory cells for long sequences",
      "Specialized architecture for time series",
      "Captures temporal dependencies"
    ],
    advantages: [
      "Excellent for sequential data",
      "Remembers information for long periods",
      "Handles vanishing gradient problem"
    ],
    limitations: [
      "Computationally intensive",
      "Requires substantial data",
      "Complex to optimize hyperparameters"
    ]
  },
  {
    id: "ann",
    name: "Artificial Neural Network",
    shortName: "ANN",
    color: "#06B6D4", // Cyan
    description: "A computing system inspired by biological neural networks. Our ANN model uses multiple layers of interconnected nodes to analyze Apple stock price data and predict future movements with high precision.",
    metrics: {
      accuracy: 0.91,
      mse: 0.022,
      mae: 0.115,
      rmse: 0.148,
      r2: 0.91
    },
    features: [
      "Multiple fully connected layers",
      "Non-linear activation functions",
      "Backpropagation learning"
    ],
    advantages: [
      "Highly adaptable to complex patterns",
      "Can model almost any function with enough neurons",
      "Generalizes well with proper training"
    ],
    limitations: [
      "Requires significant data for training",
      "Computationally expensive",
      "Black-box nature limits interpretability"
    ]
  }
];
