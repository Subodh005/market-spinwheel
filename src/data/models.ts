
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
    description: "A statistical model that uses a logistic function to model a binary dependent variable. In our implementation, we use it to predict whether Apple stock will rise or fall on the next trading day.",
    metrics: {
      accuracy: 0.82,
      mse: 0.036,
      mae: 0.148,
      rmse: 0.189,
      r2: 0.82
    },
    features: [
      "Binary classification model",
      "Probabilistic predictions",
      "Simple and interpretable"
    ],
    advantages: [
      "Provides probability scores",
      "Works well for classification tasks",
      "Quick to train and implement"
    ],
    limitations: [
      "Only suitable for binary classification",
      "Assumes linear decision boundary",
      "May underperform with non-linear relationships"
    ]
  },
  {
    id: "naive-bayes",
    name: "Naive Bayes",
    shortName: "NB",
    color: "#0D9488", // Teal
    description: "A probabilistic classifier based on applying Bayes' theorem with strong independence assumptions between the features. Our model uses Bernoulli Naive Bayes specifically tuned for stock market prediction.",
    metrics: {
      accuracy: 0.78,
      mse: 0.041,
      mae: 0.159,
      rmse: 0.202,
      r2: 0.78
    },
    features: [
      "Probabilistic classifier",
      "Works with small datasets",
      "Fast training and inference"
    ],
    advantages: [
      "Simple to implement",
      "Works well with high-dimensional data",
      "Requires less training data"
    ],
    limitations: [
      "Assumes feature independence",
      "May be outperformed by more complex models",
      "Sensitive to feature selection"
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
    id: "ann",
    name: "Artificial Neural Network",
    shortName: "ANN",
    color: "#4F46E5", // Indigo
    description: "A computational model inspired by the human brain's neural structure. Our ANN model for Apple stock prediction uses multiple hidden layers with ReLU activation functions to capture complex patterns.",
    metrics: {
      accuracy: 0.91,
      mse: 0.021,
      mae: 0.112,
      rmse: 0.145,
      r2: 0.91
    },
    features: [
      "Multi-layer architecture",
      "Non-linear modeling capabilities",
      "Adaptive learning"
    ],
    advantages: [
      "Can model complex non-linear relationships",
      "Highly adaptable to different data types",
      "Performs well with large datasets"
    ],
    limitations: [
      "Requires significant training data",
      "Computationally intensive",
      "Black box nature makes interpretation difficult"
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
    color: "#0284C7", // Sky Blue
    description: "A special kind of recurrent neural network capable of learning long-term dependencies in sequence prediction problems. Our LSTM model is specifically designed to capture temporal patterns in Apple stock prices.",
    metrics: {
      accuracy: 0.93,
      mse: 0.018,
      mae: 0.105,
      rmse: 0.134,
      r2: 0.93
    },
    features: [
      "Specialized for sequence data",
      "Can remember long-term patterns",
      "Effective for time series"
    ],
    advantages: [
      "Excellent for time-series data",
      "Can capture temporal dependencies",
      "Resistant to vanishing gradient problem"
    ],
    limitations: [
      "Computationally expensive",
      "Requires large amounts of data",
      "Complex to implement and tune properly"
    ]
  }
];
