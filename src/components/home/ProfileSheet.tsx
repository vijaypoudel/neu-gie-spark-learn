
import React from 'react';
import { ChevronRight, LogOut } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from 'react-router-dom';

const ProfileSheet = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Here you would handle the logout logic
    navigate('/');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Avatar className="h-12 w-12 cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-neugie-blue transition-all">
          <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100" alt="Profile" />
          <AvatarFallback>P</AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-96 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold font-playfair mb-6">Profile</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col items-center mb-8">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100" alt="Profile" />
            <AvatarFallback>P</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold">Sarah Johnson</h2>
          <p className="text-gray-500">sarah.johnson@example.com</p>
        </div>
        
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium mb-2">Account Settings</h3>
            <Button variant="outline" className="w-full justify-between hover:bg-neugie-light-blue hover:text-neugie-blue" asChild>
              <Link to="/profile">
                Update Parent Profile <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium mb-2">Child Profile</h3>
            <Button variant="outline" className="w-full justify-between hover:bg-neugie-light-green hover:text-neugie-green" asChild>
              <Link to="/profile">
                Update Child Details <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Subscription</h3>
            <div className="bg-gradient-to-r from-neugie-purple to-neugie-blue text-white rounded-lg p-4">
              <p className="font-medium">Premium Plan</p>
              <p className="text-sm opacity-90">Active until Dec 2025</p>
            </div>
          </div>
          
          <Button 
            onClick={handleLogout} 
            className="w-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProfileSheet;
