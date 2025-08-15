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
      <Card key={month.toISOString()} className="backdrop-blur-xl bg-white/80 border-0 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-center font-playfair text-xl text-orange-600 font-bold">
            {format(month, 'MMMM yyyy')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
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
                    isToday ? 'bg-orange-500 text-white font-bold' : 
                    isCurrentMonth ? 'text-gray-800' : 'text-gray-400'
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
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 to-gray-50">
      <div className="bg-white/90 backdrop-blur-xl p-4 flex items-center justify-between shadow-sm sticky top-0 z-10 border-b border-orange-200/30">
        <div className="flex items-center">
          <Link to="/home" className="mr-4">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-3">
            <CalendarIcon className="h-6 w-6 text-orange-500" />
            <h1 className="text-2xl font-bold font-playfair text-gray-800">
              Learning Calendar
            </h1>
          </div>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-medium">
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

      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {months.map(renderCalendarMonth)}
        </div>

        {/* Upcoming Events */}
        <Card className="backdrop-blur-xl bg-white/80 border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="font-playfair text-orange-600 font-bold">
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            {events.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No events scheduled. Click on a date to add your first event!
              </p>
            ) : (
              <div className="space-y-3">
                {events
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map(event => (
                    <div key={event.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/30">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${event.color}`} />
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {format(event.date, 'MMMM d, yyyy')}
                          </p>
                        </div>
                        <Badge variant="secondary" className="ml-2">
                          {eventTypes.find(t => t.value === event.type)?.label}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditEvent(event)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;