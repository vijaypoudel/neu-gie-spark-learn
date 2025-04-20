
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Send, Image as ImageIcon, Sparkles } from "lucide-react";
import NeugieMascot from './NeugieMascot';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AICompanion: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm NeuGie, your learning buddy! What would you like to learn today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "That's a great question! Let me explain it to you.",
        "I know about this! Here's a fun fact for you...",
        "Would you like to learn more about that topic?",
        "That's interesting! Did you know that...",
        "Let's explore that together! First, tell me what you already know."
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        text: randomResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsThinking(false);
    }, 1500);
  };

  const handleRecord = () => {
    setIsRecording(!isRecording);
    // In a real app, this would trigger voice recording
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'ai' && (
              <div className="mr-2 self-end">
                <NeugieMascot size="sm" animated={false} />
              </div>
            )}
            
            <div 
              className={`rounded-2xl px-4 py-2 max-w-[80%] ${
                message.sender === 'user' 
                  ? 'bg-neugie-blue text-white rounded-tr-none shadow-md' 
                  : 'bg-gradient-to-r from-neugie-light-yellow to-neugie-light-orange rounded-tl-none shadow-md'
              }`}
            >
              <p className={message.sender === 'user' ? '' : 'font-playfair'}>{message.text}</p>
            </div>
            
            {message.sender === 'user' && (
              <div className="ml-2 self-end opacity-70">
                <div className="w-8 h-8 bg-neugie-blue rounded-full flex items-center justify-center text-white text-sm">
                  You
                </div>
              </div>
            )}
          </div>
        ))}
        
        {isThinking && (
          <div className="flex justify-start">
            <div className="mr-2 self-end">
              <NeugieMascot size="sm" animated={true} />
            </div>
            <div className="bg-neugie-light-yellow rounded-2xl rounded-tl-none px-4 py-2 shadow-md">
              <div className="flex space-x-2 items-center">
                <div className="w-2 h-2 bg-neugie-yellow rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-neugie-yellow rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 bg-neugie-yellow rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Input area */}
      <div className="border-t p-4 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Button 
            size="icon" 
            variant="outline" 
            className="rounded-full border-neugie-yellow text-neugie-yellow hover:text-neugie-yellow hover:bg-yellow-50 hover:border-neugie-yellow"
            onClick={() => {/* Would open image picker */}}
          >
            <ImageIcon className="h-5 w-5" />
          </Button>
          
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask NeuGie anything..."
            className="neugie-input flex-1 border-2 focus:border-neugie-yellow"
          />
          
          <Button 
            size="icon" 
            variant="outline" 
            className={`rounded-full ${isRecording ? 'bg-neugie-red border-neugie-red text-white' : 'border-neugie-red text-neugie-red hover:text-neugie-red hover:bg-red-50 hover:border-neugie-red'}`}
            onClick={handleRecord}
          >
            <Mic className="h-5 w-5" />
          </Button>
          
          <Button 
            size="icon" 
            onClick={handleSendMessage}
            className="rounded-full bg-gradient-to-r from-neugie-yellow to-neugie-orange hover:opacity-90"
            disabled={!input.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AICompanion;
