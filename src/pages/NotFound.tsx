
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import NeugieMascot from '@/components/NeugieMascot';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <NeugieMascot size="lg" expression="thinking" />
      
      <h1 className="text-4xl font-bold mt-6 mb-2 text-neugie-blue">Oops!</h1>
      <p className="text-xl mb-8 text-center">
        NeuGie can't find the page you're looking for.
      </p>
      
      <Button asChild className="bg-neugie-blue">
        <Link to="/">Go Back Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
