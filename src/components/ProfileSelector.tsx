import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Baby } from "lucide-react";
import defaultParentAvatar from "@/assets/default-parent-avatar.png";
import defaultChildAvatar from "@/assets/default-child-avatar.png";

interface Profile {
  id: string;
  name: string;
  type: 'parent' | 'child';
  age?: number;
  avatar?: string;
}

interface ProfileSelectorProps {
  profiles: Profile[];
  onSelect: (profile: Profile) => void;
}

const ProfileSelector: React.FC<ProfileSelectorProps> = ({ profiles, onSelect }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {profiles.map(profile => (
          <Button
            key={profile.id}
            onClick={() => onSelect(profile)}
            variant="ghost"
            className="h-auto p-0 hover:bg-transparent group"
          >
            <div className={`
              w-full rounded-3xl p-8 transition-all duration-300 
              group-hover:scale-105 group-hover:shadow-xl
              ${profile.type === 'parent' 
                ? 'bg-gradient-to-br from-orange-100 to-orange-50 border-2 border-orange-200 hover:border-orange-300' 
                : 'bg-gradient-to-br from-yellow-100 to-yellow-50 border-2 border-yellow-200 hover:border-yellow-300'
              }
            `}>
              <div className="flex flex-col items-center space-y-4">
                {/* Avatar */}
                <div className="relative">
                  <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                    <AvatarImage 
                      src={profile.avatar || (profile.type === 'parent' ? defaultParentAvatar : defaultChildAvatar)} 
                      alt={`${profile.name}'s avatar`} 
                    />
                    <AvatarFallback className={`text-2xl font-bold text-white ${
                      profile.type === 'parent' ? 'bg-orange-500' : 'bg-yellow-500'
                    }`}>
                      {profile.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Profile type indicator */}
                  <div className={`
                    absolute -bottom-2 -right-2 w-10 h-10 rounded-full 
                    flex items-center justify-center shadow-lg border-2 border-white
                    ${profile.type === 'parent' ? 'bg-orange-500' : 'bg-yellow-500'}
                  `}>
                    {profile.type === 'parent' ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Baby className="w-5 h-5 text-white" />
                    )}
                  </div>
                </div>
                
                {/* Profile info */}
                <div className="text-center">
                  <h3 className="brand-card-title text-xl mb-1">{profile.name}</h3>
                  {profile.type === 'child' && profile.age && (
                    <p className="brand-card-text text-sm opacity-70">{profile.age} years old</p>
                  )}
                  <p className="brand-chip text-xs mt-2 inline-block">
                    {profile.type === 'parent' ? 'Parent' : 'Child'}
                  </p>
                </div>
              </div>
            </div>
          </Button>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Button 
          variant="outline" 
          className="border-orange-300 text-orange-600 hover:bg-orange-50 px-8 py-3 rounded-full font-semibold"
          onClick={() => {/* Would navigate to add profile page */}}
        >
          + Add New Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfileSelector;