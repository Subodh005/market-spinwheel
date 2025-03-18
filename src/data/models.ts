
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
    description: "A linear approach to modeling the relationship between a dependent variable and independent variables.",
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
    id: "decision-tree",
    name: "Decision Tree",
    shortName: "D-Tree",
    color: "#DC2626", // Red
    description: "A tree-like model of decisions that maps observations about an item to conclusions about the item's target value.",
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
    id: "random-forest",
    name: "Random Forest",
    shortName: "RF",
    color: "#7E22CE", // Purple
    description: "An ensemble learning method that operates by constructing multiple decision trees during training.",
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
    id: "svm",
    name: "Support Vector Machine",
    shortName: "SVM",
    color: "#0D9488", // Teal
    description: "A supervised learning model that uses classification algorithms for two-group classification problems.",
    metrics: {
      accuracy: 0.83,
      mse: 0.034,
      mae: 0.144,
      rmse: 0.184,
      r2: 0.83
    },
    features: [
      "Effective in high-dimensional spaces",
      "Uses a subset of training points",
      "Versatile through different kernel functions"
    ],
    advantages: [
      "Effective when the number of features is greater than the number of samples",
      "Memory efficient",
      "Works well with clear margin of separation"
    ],
    limitations: [
      "Not suitable for large datasets",
      "Sensitive to noise",
      "Doesn't directly provide probability estimates"
    ]
  },
  {
    id: "neural-network",
    name: "Neural Network",
    shortName: "NN",
    color: "#4F46E5", // Indigo
    description: "A series of algorithms that endeavors to recognize underlying relationships in a set of data through a process that mimics the way the human brain operates.",
    metrics: {
      accuracy: 0.91,
      mse: 0.021,
      mae: 0.112,
      rmse: 0.145,
      r2: 0.91
    },
    features: [
      "Deep learning capabilities",
      "Can capture complex non-linear patterns",
      "Adaptable to various data types"
    ],
    advantages: [
      "Excellent for complex pattern recognition",
      "Can learn from unlabeled data",
      "Highly adaptable and generalizable"
    ],
    limitations: [
      "Requires large amounts of data",
      "Computationally intensive",
      "Black box nature makes interpretation difficult"
    ]
  },
  {
    id: "xgboost",
    name: "XGBoost",
    shortName: "XGB",
    color: "#CA8A04", // Yellow
    description: "An optimized distributed gradient boosting library designed to be highly efficient, flexible and portable.",
    metrics: {
      accuracy: 0.93,
      mse: 0.018,
      mae: 0.105,
      rmse: 0.134,
      r2: 0.93
    },
    features: [
      "Gradient boosting framework",
      "Advanced regularization",
      "Handling of missing values"
    ],
    advantages: [
      "Generally outperforms other algorithms",
      "Fast execution speed",
      "Handles imbalanced datasets well"
    ],
    limitations: [
      "Can overfit with noisy data",
      "Requires careful tuning",
      "Less interpretable than simpler models"
    ]
  },
  {
    id: "lstm",
    name: "Long Short-Term Memory",
    shortName: "LSTM",
    color: "#0284C7", // Sky Blue
    description: "A special kind of recurrent neural network capable of learning long-term dependencies, especially in sequence prediction problems.",
    metrics: {
      accuracy: 0.88,
      mse: 0.029,
      mae: 0.132,
      rmse: 0.17,
      r2: 0.88
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
  },
  {
    id: "arima",
    name: "ARIMA",
    shortName: "ARIMA",
    color: "#F97316", // Orange
    description: "AutoRegressive Integrated Moving Average, a statistical analysis model that uses time series data to predict future trends.",
    metrics: {
      accuracy: 0.81,
      mse: 0.038,
      mae: 0.152,
      rmse: 0.195,
      r2: 0.81
    },
    features: [
      "Statistical time series model",
      "Decomposition of trend and seasonality",
      "Good for stationary data"
    ],
    advantages: [
      "Works well with time series data",
      "Doesn't require large amounts of data",
      "Interpretable model components"
    ],
    limitations: [
      "Assumes stationarity of data",
      "Limited ability to capture non-linear patterns",
      "Requires manual parameter tuning"
    ]
  },
  {
    id: "prophet",
    name: "Prophet",
    shortName: "Prophet",
    color: "#EC4899", // Pink
    description: "A procedure for forecasting time series data based on an additive model where non-linear trends are fit with yearly, weekly, and daily seasonality.",
    metrics: {
      accuracy: 0.84,
      mse: 0.033,
      mae: 0.141,
      rmse: 0.182,
      r2: 0.84
    },
    features: [
      "Handles missing data well",
      "Detects trend changes automatically",
      "Handles seasonality and holidays"
    ],
    advantages: [
      "Robust to outliers and missing data",
      "Automatically detects changepoints",
      "Handles seasonality at multiple scales"
    ],
    limitations: [
      "Less control over the model internals",
      "May not work well for all types of time series",
      "Sometimes produces less accurate forecasts than specialized models"
    ]
  }
];
