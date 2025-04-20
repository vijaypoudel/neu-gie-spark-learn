
import React from 'react';
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";

const subjects = [
  'Mathematics',
  'Science',
  'English',
  'Social Studies',
  'Computer Science',
  'Physical Education',
  'Art',
  'Music',
  'Languages',
  'Environmental Studies'
];

const passions = [
  { id: 'dance', label: 'Dance' },
  { id: 'singing', label: 'Singing' },
  { id: 'craft', label: 'Craft' },
  { id: 'drawing', label: 'Drawing' }
];

interface ChildProfileFormProps {
  onSubmit: (data: any) => void;
}

const ChildProfileForm = ({ onSubmit }: ChildProfileFormProps) => {
  const form = useForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-playfair">Child's Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter child's name" {...field} />
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
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-playfair">Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="curriculum"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-playfair">School Curriculum</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select curriculum" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="CBSE">CBSE</SelectItem>
                  <SelectItem value="ICSE">ICSE</SelectItem>
                  <SelectItem value="IGCSE">IGCSE</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subjects"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="font-playfair">Subjects of Interest</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 gap-4"
                >
                  {subjects.map((subject) => (
                    <div key={subject} className="flex items-center space-x-2">
                      <RadioGroupItem value={subject.toLowerCase()} id={subject.toLowerCase()} />
                      <label htmlFor={subject.toLowerCase()} className="text-sm font-playfair">
                        {subject}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passions"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-playfair">Passions Beyond Curriculum</FormLabel>
              <FormControl>
                <div className="grid grid-cols-2 gap-4">
                  {passions.map((passion) => (
                    <div key={passion.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={passion.id}
                        checked={field.value?.includes(passion.id)}
                        onCheckedChange={(checked) => {
                          const current = field.value || [];
                          if (checked) {
                            field.onChange([...current, passion.id]);
                          } else {
                            field.onChange(current.filter((id: string) => id !== passion.id));
                          }
                        }}
                      />
                      <label
                        htmlFor={passion.id}
                        className="text-sm font-playfair leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {passion.label}
                      </label>
                    </div>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passcode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-playfair">Create Passcode (8 digits)</FormLabel>
              <FormControl>
                <Input 
                  type="password" 
                  maxLength={8} 
                  pattern="[0-9]*" 
                  inputMode="numeric" 
                  placeholder="Enter 8-digit passcode" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPasscode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-playfair">Confirm Passcode</FormLabel>
              <FormControl>
                <Input 
                  type="password" 
                  maxLength={8} 
                  pattern="[0-9]*" 
                  inputMode="numeric" 
                  placeholder="Confirm 8-digit passcode" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ChildProfileForm;
