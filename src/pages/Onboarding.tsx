
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <img 
          src="/lovable-uploads/8ecc83bb-a689-41dc-a91d-f39d1208c16d.png" 
          alt="CurioBee Mascot" 
          className="w-20 h-20 mx-auto mb-6"
        />
        
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              {step === 'parent' ? 'Create Your Account' : 'Add Your Child'}
            </h1>
            <p className="text-gray-600 mt-2">
              {step === 'parent' 
                ? 'Start your journey with CurioBee' 
                : 'Help us personalize the learning experience'
              }
            </p>
          </div>

          {step === 'parent' && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Primary Parent</h2>
                <ParentProfileForm onSubmit={handleParentSubmit} />
              </div>

              {showSpouseForm ? (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Secondary Parent</h2>
                  <ParentProfileForm onSubmit={handleParentSubmit} />
                </div>
              ) : (
                <button
                  onClick={() => setShowSpouseForm(true)}
                  className="w-full py-4 rounded-xl border-2 border-dashed border-gray-300 text-gray-600 hover:border-yellow-500 hover:text-yellow-600 transition-colors"
                >
                  Add Secondary Parent
                </button>
              )}
            </div>
          )}

          {step === 'child' && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6">
              <ChildProfileForm onSubmit={handleChildSubmit} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
