
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import NeugieMascot from '@/components/NeugieMascot';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-orange-50/50 to-black/5">
      <NeugieMascot size="lg" expression="thinking" />
      
      <h1 className="text-4xl font-bold mt-6 mb-2 font-playfair">
        <span className="text-orange-500">Page</span>{" "}
        <span className="text-black">Not Found</span>
      </h1>
      
      <p className="text-xl mb-8 text-center text-gray-600 max-w-md font-playfair">
        NeuGie can't find the page you're looking for.
      </p>
      
      <Button asChild className="bg-neugie-blue hover:bg-neugie-blue/90">
        <Link to="/home">Go Back Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
