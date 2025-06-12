
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { BicepsFlexed, Info, User, Weight, Ruler } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BMIResult from './BMIResult';

interface FormData {
  age: string;
  gender: string;
  heightUnit: string;
  heightCm: string;
  heightFeet: string;
  heightInches: string;
  weightUnit: string;
  weightKg: string;
  weightLbs: string;
}

const BMICalculator = () => {
  const [formData, setFormData] = useState<FormData>({
    age: '',
    gender: '',
    heightUnit: 'cm',
    heightCm: '',
    heightFeet: '',
    heightInches: '',
    weightUnit: 'kg',
    weightKg: '',
    weightLbs: ''
  });

  const [isCalculating, setIsCalculating] = useState(false);
  const [bmiResult, setBmiResult] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    const age = parseInt(formData.age);
    if (!age || age < 1 || age > 125) {
      toast({
        title: "Invalid Age",
        description: "Please enter an age between 1 and 125 years.",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.gender) {
      toast({
        title: "Gender Required",
        description: "Please select your gender.",
        variant: "destructive"
      });
      return false;
    }

    // Height validation
    if (formData.heightUnit === 'cm') {
      const height = parseFloat(formData.heightCm);
      if (!height || height < 30 || height > 300) {
        toast({
          title: "Invalid Height",
          description: "Please enter a height between 30 and 300 cm.",
          variant: "destructive"
        });
        return false;
      }
    } else {
      const feet = parseInt(formData.heightFeet);
      const inches = parseInt(formData.heightInches);
      if (!feet || feet < 1 || feet > 8 || !inches || inches < 0 || inches > 11) {
        toast({
          title: "Invalid Height",
          description: "Please enter a valid height in feet and inches.",
          variant: "destructive"
        });
        return false;
      }
    }

    // Weight validation
    if (formData.weightUnit === 'kg') {
      const weight = parseFloat(formData.weightKg);
      if (!weight || weight < 10 || weight > 1000) {
        toast({
          title: "Invalid Weight",
          description: "Please enter a weight between 10 and 1000 kg.",
          variant: "destructive"
        });
        return false;
      }
    } else {
      const weight = parseFloat(formData.weightLbs);
      if (!weight || weight < 22 || weight > 2200) {
        toast({
          title: "Invalid Weight",
          description: "Please enter a weight between 22 and 2200 lbs.",
          variant: "destructive"
        });
        return false;
      }
    }

    return true;
  };

  const convertToMetric = () => {
    let heightInMeters: number;
    let weightInKg: number;

    // Convert height to meters
    if (formData.heightUnit === 'cm') {
      heightInMeters = parseFloat(formData.heightCm) / 100;
    } else {
      const totalInches = parseInt(formData.heightFeet) * 12 + parseInt(formData.heightInches);
      heightInMeters = totalInches * 0.0254;
    }

    // Convert weight to kg
    if (formData.weightUnit === 'kg') {
      weightInKg = parseFloat(formData.weightKg);
    } else {
      weightInKg = parseFloat(formData.weightLbs) * 0.453592;
    }

    return { heightInMeters, weightInKg };
  };

  const calculateBMI = async () => {
    if (!validateForm()) return;

    setIsCalculating(true);
    setShowResult(false);

    // Simulate calculation time for smooth UX
    await new Promise(resolve => setTimeout(resolve, 1500));

    const { heightInMeters, weightInKg } = convertToMetric();
    const bmi = weightInKg / (heightInMeters * heightInMeters);

    setBmiResult(parseFloat(bmi.toFixed(1)));
    setIsCalculating(false);
    setShowResult(true);

    toast({
      title: "BMI Calculated",
      description: `Your BMI is ${bmi.toFixed(1)}`,
    });
  };

  const isFormValid = () => {
    const hasAge = formData.age && parseInt(formData.age) >= 1 && parseInt(formData.age) <= 125;
    const hasGender = formData.gender;
    
    const hasHeight = formData.heightUnit === 'cm' 
      ? formData.heightCm 
      : formData.heightFeet && formData.heightInches;
    
    const hasWeight = formData.weightUnit === 'kg' 
      ? formData.weightKg 
      : formData.weightLbs;

    return hasAge && hasGender && hasHeight && hasWeight;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BicepsFlexed className="h-8 w-8 text-purple-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              Mao BMI Calculator
            </h1>
          </div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium">
            Know Your Numbers, Understand Your Health – Calculate Your BMI with Confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-purple-200 p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-purple-800 mb-4">Personal Information</h2>
            
            {/* Age */}
            <div className="space-y-2">
              <Label htmlFor="age" className="flex items-center gap-2 text-purple-700 font-medium">
                <User className="h-4 w-4" />
                Age (years)
              </Label>
              <Input
                id="age"
                type="number"
                min="1"
                max="125"
                placeholder="Enter your age"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                className="w-full border-purple-300 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            {/* Gender */}
            <div className="space-y-3">
              <Label className="text-base font-medium text-purple-700">Gender</Label>
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) => handleInputChange('gender', value)}
                className="flex flex-wrap gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" className="border-purple-400 text-purple-600" />
                  <Label htmlFor="male" className="text-purple-700">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" className="border-purple-400 text-purple-600" />
                  <Label htmlFor="female" className="text-purple-700">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" className="border-purple-400 text-purple-600" />
                  <Label htmlFor="other" className="text-purple-700">Other</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Height */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-purple-700 font-medium">
                <Ruler className="h-4 w-4" />
                Height
                <Info className="h-4 w-4 text-purple-500" />
              </Label>
              
              <Select value={formData.heightUnit} onValueChange={(value) => handleInputChange('heightUnit', value)}>
                <SelectTrigger className="w-48 border-purple-300 focus:border-purple-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cm">Centimeters (cm)</SelectItem>
                  <SelectItem value="ft">Feet & Inches</SelectItem>
                </SelectContent>
              </Select>

              {formData.heightUnit === 'cm' ? (
                <Input
                  type="number"
                  placeholder="Height in cm (e.g., 175)"
                  value={formData.heightCm}
                  onChange={(e) => handleInputChange('heightCm', e.target.value)}
                  className="w-full border-purple-300 focus:border-purple-500 focus:ring-purple-500"
                />
              ) : (
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Feet"
                    value={formData.heightFeet}
                    onChange={(e) => handleInputChange('heightFeet', e.target.value)}
                    className="flex-1 border-purple-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                  <Input
                    type="number"
                    placeholder="Inches"
                    value={formData.heightInches}
                    onChange={(e) => handleInputChange('heightInches', e.target.value)}
                    className="flex-1 border-purple-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              )}
            </div>

            {/* Weight */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-purple-700 font-medium">
                <Weight className="h-4 w-4" />
                Weight
                <Info className="h-4 w-4 text-purple-500" />
              </Label>
              
              <Select value={formData.weightUnit} onValueChange={(value) => handleInputChange('weightUnit', value)}>
                <SelectTrigger className="w-48 border-purple-300 focus:border-purple-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">Kilograms (kg)</SelectItem>
                  <SelectItem value="lbs">Pounds (lbs)</SelectItem>
                </SelectContent>
              </Select>

              {formData.weightUnit === 'kg' ? (
                <Input
                  type="number"
                  placeholder="Weight in kg (e.g., 70)"
                  value={formData.weightKg}
                  onChange={(e) => handleInputChange('weightKg', e.target.value)}
                  className="w-full border-purple-300 focus:border-purple-500 focus:ring-purple-500"
                />
              ) : (
                <Input
                  type="number"
                  placeholder="Weight in lbs (e.g., 154)"
                  value={formData.weightLbs}
                  onChange={(e) => handleInputChange('weightLbs', e.target.value)}
                  className="w-full border-purple-300 focus:border-purple-500 focus:ring-purple-500"
                />
              )}
            </div>

            {/* Calculate Button */}
            <Button
              onClick={calculateBMI}
              disabled={!isFormValid() || isCalculating}
              className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white disabled:opacity-50 shadow-lg"
            >
              {isCalculating ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Calculating BMI...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <BicepsFlexed className="h-5 w-5" />
                  Calculate BMI
                </div>
              )}
            </Button>

            {isCalculating && (
              <div className="space-y-2">
                <Label className="text-sm text-purple-600">Processing...</Label>
                <Progress value={66} className="w-full" />
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-purple-200 p-6">
            {showResult && bmiResult !== null ? (
              <BMIResult bmi={bmiResult} />
            ) : (
              <div className="text-center py-12">
                <BicepsFlexed className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-purple-700 mb-2">Ready to Calculate</h3>
                <p className="text-purple-600">
                  Fill in your details on the left and click "Calculate BMI" to see your results here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;
