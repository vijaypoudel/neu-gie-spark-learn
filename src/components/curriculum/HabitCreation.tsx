import React, { useState } from 'react';
import { Plus, X, Star, Clock, Target } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Habit {
  id: string;
  title: string;
  category: 'learning' | 'health' | 'creativity' | 'responsibility';
  frequency: 'daily' | 'weekly' | 'weekdays' | 'weekends';
  targetTime?: string;
  reward: string;
}

const habitCategories = [
  { value: 'learning', label: 'Learning', color: 'bg-blue-100 text-blue-800', icon: '📚' },
  { value: 'health', label: 'Health', color: 'bg-green-100 text-green-800', icon: '🏃‍♂️' },
  { value: 'creativity', label: 'Creativity', color: 'bg-purple-100 text-purple-800', icon: '🎨' },
  { value: 'responsibility', label: 'Responsibility', color: 'bg-orange-100 text-orange-800', icon: '🎯' },
];

const frequencyOptions = [
  { value: 'daily', label: 'Every day' },
  { value: 'weekly', label: 'Once a week' },
  { value: 'weekdays', label: 'Weekdays only' },
  { value: 'weekends', label: 'Weekends only' },
];

const HabitCreation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      title: 'Read for 20 minutes',
      category: 'learning',
      frequency: 'daily',
      targetTime: '20',
      reward: 'Extra playtime'
    },
    {
      id: '2',
      title: 'Practice math problems',
      category: 'learning',
      frequency: 'weekdays',
      targetTime: '15',
      reward: 'Sticker collection'
    }
  ]);
  
  const [newHabit, setNewHabit] = useState({
    title: '',
    category: 'learning' as Habit['category'],
    frequency: 'daily' as Habit['frequency'],
    targetTime: '',
    reward: ''
  });

  const handleAddHabit = () => {
    if (!newHabit.title.trim()) return;
    
    const habit: Habit = {
      id: Date.now().toString(),
      ...newHabit
    };
    
    setHabits([...habits, habit]);
    setNewHabit({
      title: '',
      category: 'learning',
      frequency: 'daily',
      targetTime: '',
      reward: ''
    });
  };

  const handleRemoveHabit = (id: string) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <div className="premium-card cursor-pointer hover:shadow-md transition-all duration-200">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-purple-500 flex items-center justify-center">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="brand-card-title">
                    Weekly Habits <span className="brand-accent">({habits.length})</span>
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Build positive daily routines for your child
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-purple-50 text-purple-700">
                  Saturday - Sunday
                </Badge>
                {isOpen ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>
          </div>
        </div>
      </CollapsibleTrigger>
      
      <CollapsibleContent className="space-y-4 mt-4">
        {/* Existing Habits */}
        {habits.length > 0 && (
          <div className="premium-card">
            <div className="p-6">
              <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Target className="h-4 w-4 text-orange-500" />
                Current Habits
              </h4>
              <div className="space-y-3">
                {habits.map((habit) => {
                  const category = habitCategories.find(c => c.value === habit.category);
                  const frequency = frequencyOptions.find(f => f.value === habit.frequency);
                  
                  return (
                    <div key={habit.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{category?.icon}</span>
                        <div>
                          <h5 className="font-medium text-gray-800">{habit.title}</h5>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className={category?.color}>
                              {category?.label}
                            </Badge>
                            <span className="text-xs text-gray-500">{frequency?.label}</span>
                            {habit.targetTime && (
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {habit.targetTime} min
                              </span>
                            )}
                          </div>
                          {habit.reward && (
                            <p className="text-xs text-purple-600 mt-1">
                              Reward: {habit.reward}
                            </p>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveHabit(habit.id)}
                        className="hover:bg-red-50 hover:text-red-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Add New Habit */}
        <div className="premium-card">
          <div className="p-6">
            <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Plus className="h-4 w-4 text-orange-500" />
              Add New Habit
            </h4>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Habit Title
                </label>
                <Input
                  placeholder="e.g., Read a bedtime story, Practice piano"
                  value={newHabit.title}
                  onChange={(e) => setNewHabit({...newHabit, title: e.target.value})}
                  className="rounded-xl"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Category
                  </label>
                  <Select
                    value={newHabit.category}
                    onValueChange={(value) => setNewHabit({...newHabit, category: value as Habit['category']})}
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {habitCategories.map(category => (
                        <SelectItem key={category.value} value={category.value}>
                          <div className="flex items-center gap-2">
                            <span>{category.icon}</span>
                            {category.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Frequency
                  </label>
                  <Select
                    value={newHabit.frequency}
                    onValueChange={(value) => setNewHabit({...newHabit, frequency: value as Habit['frequency']})}
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {frequencyOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Target Time (minutes)
                  </label>
                  <Input
                    type="number"
                    placeholder="15"
                    value={newHabit.targetTime}
                    onChange={(e) => setNewHabit({...newHabit, targetTime: e.target.value})}
                    className="rounded-xl"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Reward
                  </label>
                  <Input
                    placeholder="e.g., Extra playtime, Sticker"
                    value={newHabit.reward}
                    onChange={(e) => setNewHabit({...newHabit, reward: e.target.value})}
                    className="rounded-xl"
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleAddHabit}
                className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
                disabled={!newHabit.title.trim()}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Habit
              </Button>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default HabitCreation;
