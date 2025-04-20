
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Calendar } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";

const parentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  dateOfBirth: z.string(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
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
      confirmPassword: ""
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
              <FormLabel>{isSpouse ? 'Secondary Parent Name' : 'Full Name'}</FormLabel>
              <FormControl>
                <Input placeholder="Enter full name" {...field} />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter email" {...field} />
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
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input type="date" {...field} />
                  <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Create a password" {...field} />
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
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Confirm password" {...field} />
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
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Add secondary parent/spouse
            </label>
          </div>
        )}

        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </Form>
  );
};

export default ParentProfileForm;
