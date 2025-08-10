
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

const parentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  pin: z.string().length(4, "PIN must be 4 digits").regex(/^\d+$/, "PIN must be numeric"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

interface ParentProfileFormProps {
  onSubmit: (data: z.infer<typeof parentSchema>) => void;
  showSpouseOption?: boolean;
  onSpouseOptionChange?: (show: boolean) => void;
  isSpouse?: boolean;
}

const ParentProfileForm = ({ 
  onSubmit, 
  showSpouseOption = false,
  onSpouseOptionChange,
  isSpouse = false
}: ParentProfileFormProps) => {
  const form = useForm<z.infer<typeof parentSchema>>({
    resolver: zodResolver(parentSchema),
    defaultValues: {
      name: "",
      email: "",
      dateOfBirth: "",
      password: "",
      confirmPassword: "",
      pin: ""
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-playfair">{isSpouse ? 'Secondary Parent Name' : 'Full Name'}</FormLabel>
              <FormControl>
                <Input placeholder="Enter full name" className="h-12 rounded-xl bg-gray-50/50" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-playfair">Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter email" className="h-12 rounded-xl bg-gray-50/50" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-playfair">Date of Birth</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input type="date" className="h-12 rounded-xl bg-gray-50/50" {...field} />
                </div>
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
              <FormLabel className="font-playfair">Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Create a password" className="h-12 rounded-xl bg-gray-50/50" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-playfair">Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Confirm password" className="h-12 rounded-xl bg-gray-50/50" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-playfair">Parent PIN (4 digits)</FormLabel>
              <FormControl>
                <Input 
                  type="password" 
                  maxLength={4} 
                  pattern="[0-9]*" 
                  inputMode="numeric" 
                  placeholder="Enter 4-digit PIN" 
                  className="h-12 rounded-xl bg-gray-50/50" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {showSpouseOption && (
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="spouse"
              onCheckedChange={(checked) => onSpouseOptionChange?.(checked === true)}
            />
            <label
              htmlFor="spouse"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-playfair"
            >
              Add secondary parent/spouse
            </label>
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full h-12 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-playfair"
        >
          Continue
        </Button>
      </form>
    </Form>
  );
};

export default ParentProfileForm;
