
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-50 to-orange-100 p-4">
      <div className="text-center space-y-6 max-w-2xl">
        <img 
          src="/lovable-uploads/8ecc83bb-a689-41dc-a91d-f39d1208c16d.png" 
          alt="CurioBee Mascot" 
          className="w-32 h-32 mx-auto animate-bounce"
        />
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Welcome to CurioBee
        </h1>
        
        <p className="text-xl text-gray-600 max-w-lg mx-auto">
          Nurturing curiosity and critical thinking through smart parenting tech
        </p>
        
        <Link to="/onboarding/parent">
          <Button 
            className="text-lg px-8 py-6 bg-yellow-400 hover:bg-yellow-500 text-black"
          >
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
