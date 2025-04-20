
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import ParentProfileForm from '@/components/ParentProfileForm';
import ChildProfileForm from '@/components/ChildProfileForm';

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'parent' | 'child'>('parent');
  const [showSpouseForm, setShowSpouseForm] = useState(false);
  const [children, setChildren] = useState<any[]>([]);

  const handleParentSubmit = (data: any) => {
    setStep('child');
  };

  const handleChildSubmit = (data: any) => {
    setChildren([...children, data]);
  };

  const handleAddSpouse = () => {
    setShowSpouseForm(true);
  };

  const handleAddChild = () => {
    // Reset child form for new entry
  };

  const handleComplete = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-100 py-10 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          {step === 'parent' ? 'Parent Profile' : 'Child Profile'}
        </h1>

        {step === 'parent' && (
          <div className="space-y-6">
            <ParentProfileForm onSubmit={handleParentSubmit} />
            
            {!showSpouseForm && (
              <Button 
                variant="outline" 
                onClick={handleAddSpouse}
                className="w-full mt-4"
              >
                Add Spouse/Parent
              </Button>
            )}

            {showSpouseForm && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Spouse/Parent Details</h2>
                <ParentProfileForm onSubmit={handleParentSubmit} />
              </div>
            )}
          </div>
        )}

        {step === 'child' && (
          <div className="space-y-6">
            <ChildProfileForm onSubmit={handleChildSubmit} />
            
            {children.length > 0 && (
              <div className="mt-4 space-y-4">
                <Button 
                  variant="outline" 
                  onClick={handleAddChild}
                  className="w-full"
                >
                  Add Another Child
                </Button>
                
                <Button 
                  onClick={handleComplete}
                  className="w-full"
                >
                  Complete Setup
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
