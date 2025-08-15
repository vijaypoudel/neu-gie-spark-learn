
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ParentProfileForm from '@/components/ParentProfileForm';
import ChildProfileForm from '@/components/ChildProfileForm';
import { saveParentProfile, addChildProfile } from '@/lib/profileStore';
const Onboarding = () => {
  const navigate = useNavigate();
  const [showSpouseForm, setShowSpouseForm] = useState(false);
  const [currentStep, setCurrentStep] = useState<'parent' | 'spouse' | 'child'>('parent');
  const [parentData, setParentData] = useState<any>(null);
  const [spouseData, setSpouseData] = useState<any>(null);
  
// Function to handle parent profile submission
  const handleParentSubmit = (data: any) => {
    setParentData(data);
    // Persist parent profile with PIN
    saveParentProfile({
      name: data.name,
      email: data.email,
      dateOfBirth: data.dateOfBirth,
      pin: data.pin,
    });
    if (showSpouseForm) {
      setCurrentStep('spouse');
    } else {
      setCurrentStep('child');
    }
  };

  // Function to handle spouse profile submission
  const handleSpouseSubmit = (data: any) => {
    setSpouseData(data);
    setCurrentStep('child');
  };

// Function to handle child profile submission
  const handleChildSubmit = (data: any) => {
    // Persist child profile
    addChildProfile(data);
    console.log({ parentData, spouseData, childData: data });
    toast.success("Profile created successfully!");
    navigate('/profile-selection');
  };

  // Function to go back to previous step
  const handleBack = () => {
    if (currentStep === 'child' && showSpouseForm) {
      setCurrentStep('spouse');
    } else if (currentStep === 'child' || currentStep === 'spouse') {
      setCurrentStep('parent');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="max-w-md mx-auto">
        <img 
          src="/lovable-uploads/8a2bf812-5023-41f7-aef5-bff84f9a8786.png" 
          alt="Neugie Mascot" 
          className="w-24 h-24 mx-auto mb-6"
        />
        
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-6">
          {/* Step indicator */}
          <div className="flex justify-between mb-6">
            <div 
              className={`h-2 flex-1 rounded-l-full ${
                currentStep === 'parent' ? 'bg-yellow-500' : 'bg-yellow-300'
              }`}
            ></div>
            <div 
              className={`h-2 flex-1 ${
                currentStep === 'spouse' ? 'bg-orange-400' : 
                currentStep === 'child' ? 'bg-orange-300' : 'bg-gray-200'
              }`}
            ></div>
            <div 
              className={`h-2 flex-1 rounded-r-full ${
                currentStep === 'child' ? 'bg-orange-500' : 'bg-gray-200'
              }`}
            ></div>
          </div>
          
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 font-playfair">
              {currentStep === 'parent' && 'Create Your Account'}
              {currentStep === 'spouse' && 'Add Secondary Parent'}
              {currentStep === 'child' && 'Add Your Child'}
            </h1>
            <p className="text-gray-600 mt-2 text-sm font-playfair">
              {currentStep === 'parent' && 'Start your journey with Neugie'}
              {currentStep === 'spouse' && 'Optional: Add another parent'}
              {currentStep === 'child' && 'Help us personalize the learning experience'}
            </p>
          </div>

          {currentStep === 'parent' && (
            <div className="space-y-6">
              <ParentProfileForm 
                onSubmit={handleParentSubmit} 
                showSpouseOption={true}
                onSpouseOptionChange={setShowSpouseForm}
              />
            </div>
          )}

          {currentStep === 'spouse' && (
            <div className="space-y-6">
              <ParentProfileForm 
                onSubmit={handleSpouseSubmit}
                isSpouse={true}
              />
              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  onClick={handleBack}
                  className="mt-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                >
                  Back
                </Button>
              </div>
            </div>
          )}

          {currentStep === 'child' && (
            <>
              <ChildProfileForm onSubmit={handleChildSubmit} />
              <div className="flex justify-center mt-4">
                <Button 
                  variant="outline" 
                  onClick={handleBack}
                  className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                >
                  Back
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
