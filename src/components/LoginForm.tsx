
import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Eye, EyeOff } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    // TODO: Implement actual login logic
    toast({
      title: "Login successful",
      description: "Welcome back to CurioBee!",
    });
    navigate('/home');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Welcome back</h2>
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Email</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter your email" 
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password" 
                    className="h-12 rounded-xl bg-gray-50/50 pr-10"
                    {...field} 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full h-12 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
        >
          Sign In
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
