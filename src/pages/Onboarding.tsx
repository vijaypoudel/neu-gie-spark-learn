
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NeugieMascot from '@/components/NeugieMascot';

type OnboardingStep = 'welcome' | 'parent' | 'child';

const Onboarding = () => {
  const [step, setStep] = useState<OnboardingStep>('welcome');
  const [parentName, setParentName] = useState('');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState<number | ''>('');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (step === 'welcome') {
      setStep('parent');
    } else if (step === 'parent') {
      if (parentName) {
        setStep('child');
      }
    } else if (step === 'child') {
      if (childName && childAge) {
        // In a real app, this would save the profile data
        navigate('/home');
      }
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative bg-gradient-to-b from-white to-neugie-light-blue">
      {/* Decorative curved waves at the bottom */}
      <div className="wave-bg"></div>
      
      <div className="w-full max-w-md z-10">
        {step === 'welcome' && (
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <NeugieMascot size="lg" expression="happy" />
            </div>
            
            <h1 className="text-4xl font-bold mb-4 text-neugie-blue">Welcome to NeuGie!</h1>
            <p className="mb-6 text-gray-600">Your child's AI learning companion for safe, fun, and educational experiences.</p>
            
            <Button 
              onClick={handleContinue}
              className="neugie-button bg-neugie-blue w-full"
            >
              Get Started
            </Button>
          </div>
        )}
        
        {step === 'parent' && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">Let's set up your parent profile</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="parentName">Your Name</Label>
                <Input
                  id="parentName"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="neugie-input"
                  placeholder="Enter your name"
                />
              </div>
              
              {/* More parent fields could be added here */}
              
              <Button 
                onClick={handleContinue}
                className="neugie-button bg-neugie-blue w-full mt-6"
                disabled={!parentName}
              >
                Continue
              </Button>
              
              <Button 
                variant="link"
                onClick={() => setStep('welcome')}
                className="w-full text-gray-500"
              >
                Go Back
              </Button>
            </div>
          </div>
        )}
        
        {step === 'child' && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">Now let's set up your child's profile</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="childName">Child's Name</Label>
                <Input
                  id="childName"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  className="neugie-input"
                  placeholder="Enter child's name"
                />
              </div>
              
              <div>
                <Label htmlFor="childAge">Child's Age</Label>
                <Input
                  id="childAge"
                  type="number"
                  min={3}
                  max={10}
                  value={childAge}
                  onChange={(e) => setChildAge(e.target.value ? parseInt(e.target.value) : '')}
                  className="neugie-input"
                  placeholder="Enter child's age"
                />
              </div>
              
              {/* Education board selector would go here */}
              
              <Button 
                onClick={handleContinue}
                className="neugie-button bg-neugie-green w-full mt-6"
                disabled={!childName || !childAge}
              >
                Complete Setup
              </Button>
              
              <Button 
                variant="link"
                onClick={() => setStep('parent')}
                className="w-full text-gray-500"
              >
                Go Back
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
