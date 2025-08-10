
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Eye, EyeOff } from 'lucide-react';
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { hasChildProfiles } from "@/lib/profileStore";

// Form validation schemas
const parentSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const childSchema = z.object({
  email: z.string().email("Parent's email address is required"),
  passcode: z.string().length(8, "Passcode must be 8 digits").regex(/^\d+$/, "Passcode must contain only numbers"),
});

interface LoginFormProps {
  type: 'parent' | 'child';
}

const LoginForm = ({ type }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(type === 'parent' ? parentSchema : childSchema),
    defaultValues: {
      email: "",
      ...(type === 'parent' ? { password: "" } : { passcode: "" }),
    },
  });

const onSubmit = (data: any) => {
    toast.success(`${type === 'parent' ? 'Parent' : 'Child'} login successful`);
    if (type === 'parent') {
      // If no child profiles exist, force onboarding to create at least one child
      if (hasChildProfiles()) {
        navigate('/profile-selection');
      } else {
        navigate('/onboarding');
      }
    } else {
      navigate('/kids-home');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-2xl font-playfair font-semibold text-gray-800 mb-6">
          {type === 'parent' ? 'Welcome back' : 'Welcome, young explorer!'}
        </h2>
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-playfair">
                {type === 'parent' ? 'Email' : "Parent's Email"}
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder={type === 'parent' ? 'Enter your email' : "Enter parent's email"} 
                  className="h-12 rounded-xl bg-gray-50/50"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={type === 'parent' ? 'password' : 'passcode'}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-playfair">
                {type === 'parent' ? 'Password' : 'Passcode'}
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    type={type === 'parent' ? (showPassword ? "text" : "password") : "password"}
                    placeholder={type === 'parent' ? "Enter your password" : "Enter your 8-digit passcode"} 
                    className="h-12 rounded-xl bg-gray-50/50 pr-10"
                    maxLength={type === 'child' ? 8 : undefined}
                    pattern={type === 'child' ? "[0-9]*" : undefined}
                    inputMode={type === 'child' ? "numeric" : undefined}
                    {...field} 
                  />
                  {type === 'parent' && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full h-12 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-playfair"
        >
          Sign In
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
