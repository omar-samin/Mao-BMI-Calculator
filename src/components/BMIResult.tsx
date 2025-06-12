
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
        color: 'bg-blue-100 border-blue-400 text-blue-800',
        icon: <AlertCircle className="h-5 w-5 text-blue-600" />,
        description: 'Significantly below healthy weight range. Consider consulting a healthcare professional.',
        bodyShape: '▁'
      };
    } else if (bmi < 18.5) {
      return {
        name: 'Underweight',
        range: '16 ≤ BMI < 18.5',
        color: 'bg-cyan-100 border-cyan-400 text-cyan-800',
        icon: <AlertTriangle className="h-5 w-5 text-cyan-600" />,
        description: 'Below healthy weight range. Consider a balanced nutrition plan.',
        bodyShape: '▂'
      };
    } else if (bmi < 25) {
      return {
        name: 'Healthy Weight',
        range: '18.5 ≤ BMI < 25',
        color: 'bg-emerald-100 border-emerald-400 text-emerald-800',
        icon: <CheckCircle className="h-5 w-5 text-emerald-600" />,
        description: 'Within healthy weight range. Maintain your current lifestyle.',
        bodyShape: '▃'
      };
    } else if (bmi < 30) {
      return {
        name: 'Overweight',
        range: '25 ≤ BMI < 30',
        color: 'bg-amber-100 border-amber-400 text-amber-800',
        icon: <AlertTriangle className="h-5 w-5 text-amber-600" />,
        description: 'Above healthy weight range. Consider lifestyle modifications.',
        bodyShape: '▄'
      };
    } else if (bmi < 40) {
      return {
        name: 'Obese',
        range: '30 ≤ BMI < 40',
        color: 'bg-orange-100 border-orange-400 text-orange-800',
        icon: <AlertCircle className="h-5 w-5 text-orange-600" />,
        description: 'Significantly above healthy weight range. Consult with a healthcare professional.',
        bodyShape: '▅'
      };
    } else {
      return {
        name: 'Severe Obese',
        range: 'BMI ≥ 40',
        color: 'bg-red-100 border-red-400 text-red-800',
        icon: <AlertCircle className="h-5 w-5 text-red-600" />,
        description: 'Well above healthy weight range. Medical consultation strongly recommended.',
        bodyShape: '▆'
      };
    }
  };

  const category = getBMICategory(bmi);

  const allCategories: BMICategory[] = [
    {
      name: 'Severe Underweight',
      range: 'BMI < 16',
      color: 'bg-blue-50 border-blue-300 text-blue-700',
      icon: <AlertCircle className="h-4 w-4 text-blue-600" />,
      description: '',
      bodyShape: '▁'
    },
    {
      name: 'Underweight',
      range: '16 ≤ BMI < 18.5',
      color: 'bg-cyan-50 border-cyan-300 text-cyan-700',
      icon: <AlertTriangle className="h-4 w-4 text-cyan-600" />,
      description: '',
      bodyShape: '▂'
    },
    {
      name: 'Healthy Weight',
      range: '18.5 ≤ BMI < 25',
      color: 'bg-emerald-50 border-emerald-300 text-emerald-700',
      icon: <CheckCircle className="h-4 w-4 text-emerald-600" />,
      description: '',
      bodyShape: '▃'
    },
    {
      name: 'Overweight',
      range: '25 ≤ BMI < 30',
      color: 'bg-amber-50 border-amber-300 text-amber-700',
      icon: <AlertTriangle className="h-4 w-4 text-amber-600" />,
      description: '',
      bodyShape: '▄'
    },
    {
      name: 'Obese',
      range: '30 ≤ BMI < 40',
      color: 'bg-orange-50 border-orange-300 text-orange-700',
      icon: <AlertCircle className="h-4 w-4 text-orange-600" />,
      description: '',
      bodyShape: '▅'
    },
    {
      name: 'Severe Obese',
      range: 'BMI ≥ 40',
      color: 'bg-red-50 border-red-300 text-red-700',
      icon: <AlertCircle className="h-4 w-4 text-red-600" />,
      description: '',
      bodyShape: '▆'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-purple-800 mb-2">Your BMI Result</h2>
        <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          {bmi}
        </div>
        <p className="text-purple-600 font-medium">Body Mass Index</p>
      </div>

      {/* Current Category Highlight */}
      <div className={`p-4 rounded-lg border-2 ${category.color} text-center shadow-lg`}>
        <div className="flex items-center justify-center gap-2 mb-2">
          {category.icon}
          <h3 className="text-lg font-semibold">{category.name}</h3>
        </div>
        <p className="text-sm font-medium mb-2">{category.range}</p>
        <p className="text-sm">{category.description}</p>
        
        {/* Body Shape Visualization */}
        <div className="mt-4">
          <div className="text-4xl mx-auto w-fit p-2 bg-white/70 rounded-lg shadow-sm">
            {category.bodyShape}
          </div>
          <p className="text-xs text-gray-600 mt-1">Visual representation</p>
        </div>
      </div>

      {/* BMI Scale */}
      <div className="space-y-3">
        <h4 className="font-semibold text-purple-800">BMI Categories</h4>
        <div className="space-y-2">
          {allCategories.map((cat, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                cat.name === category.name 
                  ? `${category.color} border-2 font-semibold shadow-md transform scale-105` 
                  : `${cat.color} hover:shadow-md hover:scale-102`
              }`}
            >
              <div className="flex items-center gap-2">
                {cat.icon}
                <span className="text-sm font-medium">{cat.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs">{cat.range}</span>
                <span className="text-lg">{cat.bodyShape}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Health Notice */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-purple-300 rounded-lg p-4 shadow-sm">
        <p className="text-sm text-purple-700">
          <strong>Important:</strong> BMI is a general screening tool. For personalized health advice, 
          please consult with a qualified healthcare professional who can consider your individual 
          circumstances, medical history, and other health factors.
        </p>
      </div>
    </div>
  );
};

export default BMIResult;
