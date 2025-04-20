
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import LoginForm from '@/components/LoginForm';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 h-screen flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Left side - Branding */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <img 
            src="/lovable-uploads/8ecc83bb-a689-41dc-a91d-f39d1208c16d.png" 
            alt="CurioBee Mascot" 
            className="w-24 h-24 mx-auto md:mx-0"
          />
          
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-orange-500">
            CurioBee
          </h1>
          
          <p className="text-xl text-gray-600 max-w-md">
            Nurturing curiosity and critical thinking through smart parenting tech
          </p>
        </div>

        {/* Right side - Login Form */}
        <div className="md:w-1/2 w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-gray-100">
            <LoginForm />
            
            <div className="mt-6 text-center">
              <p className="text-gray-600 mb-4">
                Don't have an account?
              </p>
              <Link to="/onboarding">
                <Button 
                  variant="outline"
                  className="w-full border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                >
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
