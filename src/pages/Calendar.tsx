import React, { useState } from 'react';
import { ChevronLeft, Plus, Edit, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth } from 'date-fns';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Event {
  id: string;
  title: string;
  date: Date;
  type: 'exam' | 'assignment' | 'storytelling' | 'activity' | 'other';
  color: string;
}

const eventTypes = [
  { value: 'exam', label: 'Exam', color: 'bg-red-500' },
  { value: 'assignment', label: 'Assignment', color: 'bg-orange-500' },
  { value: 'storytelling', label: 'Storytelling', color: 'bg-purple-500' },
  { value: 'activity', label: 'Activity', color: 'bg-blue-500' },
  { value: 'other', label: 'Other', color: 'bg-gray-500' },
];

const Calendar = () => {
  const today = new Date();
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Math Exam',
      date: new Date(today.getFullYear(), today.getMonth(), 15),
      type: 'exam',
      color: 'bg-red-500'
    },
    {
      id: '2',
      title: 'Storytelling on Giraffes',
      date: new Date(today.getFullYear(), today.getMonth(), 22),
      type: 'storytelling',
      color: 'bg-purple-500'
    }
  ]);
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'other' as Event['type'],
    date: new Date()
  });

  const months = [today, addMonths(today, 1), addMonths(today, 2)];

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const handleAddEvent = () => {
    if (!newEvent.title.trim()) {
      toast.error("Please enter an event title");
      return;
    }

    const eventType = eventTypes.find(type => type.value === newEvent.type);
    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title,
      date: selectedDate || newEvent.date,
      type: newEvent.type,
      color: eventType?.color || 'bg-gray-500'
    };

    setEvents([...events, event]);
    setNewEvent({ title: '', type: 'other', date: new Date() });
    setIsDialogOpen(false);
    setSelectedDate(null);
    toast.success("Event added successfully!");
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setNewEvent({
      title: event.title,
      type: event.type,
      date: event.date
    });
    setIsDialogOpen(true);
  };

  const handleUpdateEvent = () => {
    if (!editingEvent || !newEvent.title.trim()) return;

    const eventType = eventTypes.find(type => type.value === newEvent.type);
    const updatedEvent: Event = {
      ...editingEvent,
      title: newEvent.title,
      type: newEvent.type,
      color: eventType?.color || 'bg-gray-500'
    };

    setEvents(events.map(e => e.id === editingEvent.id ? updatedEvent : e));
    setEditingEvent(null);
    setNewEvent({ title: '', type: 'other', date: new Date() });
    setIsDialogOpen(false);
    toast.success("Event updated successfully!");
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(e => e.id !== eventId));
    toast.success("Event deleted successfully!");
  };

  const renderCalendarMonth = (month: Date) => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    const firstDayOfWeek = monthStart.getDay();
    const emptyDays = Array.from({ length: firstDayOfWeek }, (_, i) => i);

    return (
      <div key={month.toISOString()} className="premium-card">
        <div className="p-6">
          <h3 className="text-center brand-card-title mb-4">
            {format(month, 'MMMM yyyy')}
          </h3>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 p-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {emptyDays.map(day => (
              <div key={`empty-${day}`} className="h-12"></div>
            ))}
            {days.map(day => {
              const dayEvents = getEventsForDate(day);
              const isToday = isSameDay(day, today);
              const isCurrentMonth = isSameMonth(day, month);
              
              return (
                <button
                  key={day.toISOString()}
                  onClick={() => {
                    setSelectedDate(day);
                    setIsDialogOpen(true);
                  }}
                  className={`h-12 p-1 rounded-lg text-sm relative transition-all hover:bg-orange-100 ${
                    isToday ? 'bg-orange-500 text-white font-bold shadow-lg' : 
                    isCurrentMonth ? 'text-gray-800 hover:shadow-md' : 'text-gray-400'
                  }`}
                >
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <span>{format(day, 'd')}</span>
                    {dayEvents.length > 0 && (
                      <div className="flex gap-0.5 mt-0.5">
                        {dayEvents.slice(0, 2).map((event, idx) => (
                          <div
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full ${event.color}`}
                          />
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        )}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen premium-gradient-bg">
      <header className="premium-card sticky top-0 z-50 mx-4 mt-4 mb-6">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/home" className="mr-4 -ml-2 flex items-center">
              <ChevronLeft className="h-5 w-5 text-orange-500" />
              <span className="text-orange-500 font-semibold ml-1 hidden sm:inline">Back</span>
            </Link>
            <div className="flex items-center gap-3">
              <CalendarIcon className="h-6 w-6 text-orange-500" />
              <h1 className="brand-heading">
                <span className="brand-accent">Learning</span>{" "}
                <span>Calendar</span>
              </h1>
            </div>
          </div>
        
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl shadow-lg">
                <Plus className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {editingEvent ? 'Edit Event' : 'Add New Event'}
                </DialogTitle>
                <DialogDescription>
                  {selectedDate && !editingEvent && 
                    `Adding event for ${format(selectedDate, 'MMMM d, yyyy')}`
                  }
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    placeholder="e.g., Math Exam, Storytelling on Giraffes"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Event Type</Label>
                  <Select
                    value={newEvent.type}
                    onValueChange={(value) => setNewEvent({...newEvent, type: value as Event['type']})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${type.color}`} />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => {
                  setIsDialogOpen(false);
                  setEditingEvent(null);
                  setNewEvent({ title: '', type: 'other', date: new Date() });
                  setSelectedDate(null);
                }}>
                  Cancel
                </Button>
                <Button onClick={editingEvent ? handleUpdateEvent : handleAddEvent}>
                  {editingEvent ? 'Update Event' : 'Add Event'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {months.map(renderCalendarMonth)}
          </div>

          {/* Upcoming Events */}
          <div className="premium-card">
            <div className="p-6">
              <h2 className="brand-card-title mb-4">
                Upcoming Events
              </h2>
              <div>
                {events.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No events scheduled. Click on a date to add your first event!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {events
                      .sort((a, b) => a.date.getTime() - b.date.getTime())
                      .map(event => (
                        <div key={event.id} className="flex items-center justify-between p-4 rounded-xl bg-orange-50 border border-orange-100">
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full ${event.color}`} />
                            <div>
                              <h4 className="font-semibold brand-card-text">{event.title}</h4>
                              <p className="text-sm text-gray-500">
                                {format(event.date, 'MMMM d, yyyy')}
                              </p>
                            </div>
                            <Badge variant="secondary" className="ml-2 bg-white shadow-sm">
                              {eventTypes.find(t => t.value === event.type)?.label}
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditEvent(event)}
                              className="hover:bg-white/80"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteEvent(event.id)}
                              className="hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;