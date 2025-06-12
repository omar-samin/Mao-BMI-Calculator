
import React from 'react';
import { CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';

interface BMIResultProps {
  bmi: number;
}

interface BMICategory {
  name: string;
  range: string;
  color: string;
  icon: React.ReactNode;
  description: string;
  bodyShape: string;
}

const BMIResult: React.FC<BMIResultProps> = ({ bmi }) => {
  const getBMICategory = (bmi: number): BMICategory => {
    if (bmi < 16) {
      return {
        name: 'Severe Underweight',
        range: 'BMI < 16',
        color: 'severe-underweight',
        icon: <AlertCircle className="h-5 w-5" />,
        description: 'Significantly below healthy weight range. Consider consulting a healthcare professional.',
        bodyShape: '▁' // Very thin representation
      };
    } else if (bmi < 18.5) {
      return {
        name: 'Underweight',
        range: '16 ≤ BMI < 18.5',
        color: 'underweight',
        icon: <AlertTriangle className="h-5 w-5" />,
        description: 'Below healthy weight range. Consider a balanced nutrition plan.',
        bodyShape: '▂' // Thin representation
      };
    } else if (bmi < 25) {
      return {
        name: 'Healthy Weight',
        range: '18.5 ≤ BMI < 25',
        color: 'healthy',
        icon: <CheckCircle className="h-5 w-5" />,
        description: 'Within healthy weight range. Maintain your current lifestyle.',
        bodyShape: '▃' // Normal representation
      };
    } else if (bmi < 30) {
      return {
        name: 'Overweight',
        range: '25 ≤ BMI < 30',
        color: 'overweight',
        icon: <AlertTriangle className="h-5 w-5" />,
        description: 'Above healthy weight range. Consider lifestyle modifications.',
        bodyShape: '▄' // Slightly heavy representation
      };
    } else if (bmi < 40) {
      return {
        name: 'Obese',
        range: '30 ≤ BMI < 40',
        color: 'obese',
        icon: <AlertCircle className="h-5 w-5" />,
        description: 'Significantly above healthy weight range. Consult with a healthcare professional.',
        bodyShape: '▅' // Heavy representation
      };
    } else {
      return {
        name: 'Severe Obese',
        range: 'BMI ≥ 40',
        color: 'severe-obese',
        icon: <AlertCircle className="h-5 w-5" />,
        description: 'Well above healthy weight range. Medical consultation strongly recommended.',
        bodyShape: '▆' // Very heavy representation
      };
    }
  };

  const category = getBMICategory(bmi);

  const allCategories: BMICategory[] = [
    {
      name: 'Severe Underweight',
      range: 'BMI < 16',
      color: 'severe-underweight',
      icon: <AlertCircle className="h-4 w-4" />,
      description: '',
      bodyShape: '▁'
    },
    {
      name: 'Underweight',
      range: '16 ≤ BMI < 18.5',
      color: 'underweight',
      icon: <AlertTriangle className="h-4 w-4" />,
      description: '',
      bodyShape: '▂'
    },
    {
      name: 'Healthy Weight',
      range: '18.5 ≤ BMI < 25',
      color: 'healthy',
      icon: <CheckCircle className="h-4 w-4" />,
      description: '',
      bodyShape: '▃'
    },
    {
      name: 'Overweight',
      range: '25 ≤ BMI < 30',
      color: 'overweight',
      icon: <AlertTriangle className="h-4 w-4" />,
      description: '',
      bodyShape: '▄'
    },
    {
      name: 'Obese',
      range: '30 ≤ BMI < 40',
      color: 'obese',
      icon: <AlertCircle className="h-4 w-4" />,
      description: '',
      bodyShape: '▅'
    },
    {
      name: 'Severe Obese',
      range: 'BMI ≥ 40',
      color: 'severe-obese',
      icon: <AlertCircle className="h-4 w-4" />,
      description: '',
      bodyShape: '▆'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Your BMI Result</h2>
        <div className="text-5xl font-bold text-primary mb-2">{bmi}</div>
        <p className="text-muted-foreground">Body Mass Index</p>
      </div>

      {/* Current Category Highlight */}
      <div className={`p-4 rounded-lg border-2 ${category.color} text-center`}>
        <div className="flex items-center justify-center gap-2 mb-2">
          {category.icon}
          <h3 className="text-lg font-semibold">{category.name}</h3>
        </div>
        <p className="text-sm font-medium mb-2">{category.range}</p>
        <p className="text-sm">{category.description}</p>
        
        {/* Body Shape Visualization */}
        <div className="mt-4">
          <div className="text-4xl mx-auto w-fit p-2 bg-white/50 rounded-lg">
            {category.bodyShape}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Visual representation</p>
        </div>
      </div>

      {/* BMI Scale */}
      <div className="space-y-3">
        <h4 className="font-semibold text-foreground">BMI Categories</h4>
        <div className="space-y-2">
          {allCategories.map((cat, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                cat.name === category.name 
                  ? `${cat.color} border-2 font-semibold` 
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center gap-2">
                {cat.icon}
                <span className="text-sm">{cat.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{cat.range}</span>
                <span className="text-lg">{cat.bodyShape}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Health Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Important:</strong> BMI is a general screening tool. For personalized health advice, 
          please consult with a qualified healthcare professional who can consider your individual 
          circumstances, medical history, and other health factors.
        </p>
      </div>
    </div>
  );
};

export default BMIResult;
