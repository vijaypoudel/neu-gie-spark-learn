
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import ParentProfileForm from '@/components/ParentProfileForm';
import ChildProfileForm from '@/components/ChildProfileForm';
import { toast } from "sonner";

// Form validation schema
const parentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  dateOfBirth: z.string(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

const Onboarding = () => {
  const navigate = useNavigate();
  const [showSpouseForm, setShowSpouseForm] = useState(false);
  const [currentStep, setCurrentStep] = useState<'parent' | 'spouse' | 'child'>('parent');
  const [parentData, setParentData] = useState<any>(null);
  const [spouseData, setSpouseData] = useState<any>(null);
  
  const form = useForm({
    resolver: zodResolver(parentSchema),
    defaultValues: {
      name: "",
      email: "",
      dateOfBirth: "",
      password: "",
      confirmPassword: ""
    }
  });

  const handleParentSubmit = (data: any) => {
    setParentData(data);
    if (showSpouseForm) {
      setCurrentStep('spouse');
    } else {
      setCurrentStep('child');
    }
  };

  const handleSpouseSubmit = (data: any) => {
    setSpouseData(data);
    setCurrentStep('child');
  };

  const handleChildSubmit = (data: any) => {
    // Here you would typically save all the data
    console.log({ parentData, spouseData, childData: data });
    toast.success("Profile created successfully!");
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="max-w-md mx-auto">
        <img 
          src="/lovable-uploads/8a2bf812-5023-41f7-aef5-bff84f9a8786.png" 
          alt="CurioBee Mascot" 
          className="w-24 h-24 mx-auto mb-6 animate-bounce"
        />
        
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {currentStep === 'parent' && 'Create Your Account'}
              {currentStep === 'spouse' && 'Add Secondary Parent'}
              {currentStep === 'child' && 'Add Your Child'}
            </h1>
            <p className="text-gray-600 mt-2 text-sm">
              {currentStep === 'parent' && 'Start your journey with CurioBee'}
              {currentStep === 'spouse' && 'Optional: Add another parent'}
              {currentStep === 'child' && 'Help us personalize the learning experience'}
            </p>
          </div>

          {currentStep === 'parent' && (
            <div className="space-y-6">
              <ParentProfileForm 
                onSubmit={handleParentSubmit} 
                showSpouseOption={true}
                onSpouseOptionChange={(show) => setShowSpouseForm(show)}
              />
            </div>
          )}

          {currentStep === 'spouse' && (
            <div className="space-y-6">
              <ParentProfileForm 
                onSubmit={handleSpouseSubmit}
                isSpouse={true}
              />
            </div>
          )}

          {currentStep === 'child' && (
            <ChildProfileForm onSubmit={handleChildSubmit} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
