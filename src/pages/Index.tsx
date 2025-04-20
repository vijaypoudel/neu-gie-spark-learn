
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import LoginForm from '@/components/LoginForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 h-screen flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Left side - Branding */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <img 
            src="/lovable-uploads/8ecc83bb-a689-41dc-a91d-f39d1208c16d.png" 
            alt="CurioBee Mascot" 
            className="w-24 h-24 mx-auto md:mx-0 animate-bounce"
          />
          
          <h1 className="text-4xl md:text-6xl font-bold">
            <span className="text-yellow-500">Curio</span>
            <span className="text-orange-500">Bee</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-md font-playfair">
            Nurturing curiosity and critical thinking through smart parenting tech
          </p>
        </div>

        {/* Right side - Login Form */}
        <div className="md:w-1/2 w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-gray-100">
            <Tabs defaultValue="parent" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="parent">Parent Login</TabsTrigger>
                <TabsTrigger value="child">Child Login</TabsTrigger>
              </TabsList>
              <TabsContent value="parent">
                <LoginForm type="parent" />
              </TabsContent>
              <TabsContent value="child">
                <LoginForm type="child" />
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600 mb-4 font-playfair">
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
