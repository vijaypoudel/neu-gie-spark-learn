
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const WorkInProgress = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-orange-50/50 to-yellow-50/30">
      {/* Jumping Bee */}
      <div className="w-32 h-32 mb-8 animate-bounce">
        <img 
          src="/lovable-uploads/35f5ac98-6e29-4840-b3eb-4574cdad8341.png"
          alt="Cute bee mascot"
          className="w-full h-full object-contain"
        />
      </div>
      
      <h1 className="text-4xl font-bold mt-6 mb-2 font-playfair">
        <span className="text-yellow-500">Work in</span>{" "}
        <span className="text-orange-500">Progress</span>
      </h1>
      
      <p className="text-xl mb-8 text-center text-gray-600 max-w-md font-playfair">
        Our busy bees are working hard to build this feature. Check back soon!
      </p>
      
      <Button 
        onClick={() => navigate(-1)}
        className="bg-neugie-blue hover:bg-neugie-blue/90"
      >
        Go Back
      </Button>
    </div>
  );
};

export default WorkInProgress;
