import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import LoginForm from '@/components/LoginForm';


const Login = () => {
  useEffect(() => {
    document.title = 'Parent Login | Neugie';
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-black/5 flex items-center justify-center p-4">
      <div className="container mx-auto px-4 py-8 h-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 max-w-5xl">
        <div className="md:w-1/2 text-center md:text-left space-y-6 max-w-sm">
          <img 
            src="/lovable-uploads/8a2bf812-5023-41f7-aef5-bff84f9a8786.png" 
            alt="Neugie Mascot" 
            className="w-24 h-24 mx-auto md:mx-0"
          />
          
          <h1 className="text-4xl md:text-6xl font-bold font-playfair">
            <span className="text-orange-500">Neu</span>
            <span className="text-black">gie</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-md font-playfair">
            Nurturing curiosity and critical thinking through smart parenting tech
          </p>
        </div>

        <div className="md:w-1/2 w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100">
            <LoginForm />
            
            <div className="mt-6 text-center">
              <p className="text-gray-600 mb-4 font-playfair">
                Don't have an account?
              </p>
              <Link to="/onboarding">
                <Button 
                  variant="outline"
                  className="w-full border-yellow-500 text-yellow-600 hover:bg-yellow-50 h-12 rounded-xl font-playfair"
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

export default Login;
