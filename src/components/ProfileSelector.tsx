
import React from 'react';
import { Button } from "@/components/ui/button";

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
      <h2 className="text-2xl font-bold text-center mb-6">Who's learning today?</h2>
      
      <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
        {profiles.map(profile => (
          <Button
            key={profile.id}
            onClick={() => onSelect(profile)}
            className={`neugie-button flex flex-col items-center py-6 ${
              profile.type === 'parent' ? 'bg-neugie-blue' : 'bg-neugie-green'
            }`}
          >
            {/* Avatar */}
            <div className={`w-16 h-16 rounded-full mb-2 flex items-center justify-center text-white text-xl 
              ${profile.type === 'parent' ? 'bg-neugie-light-blue' : 'bg-neugie-light-green'}`}>
              {profile.avatar ? (
                <img src={profile.avatar} alt={profile.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <span>{profile.name.charAt(0).toUpperCase()}</span>
              )}
            </div>
            
            <span>{profile.name}</span>
            {profile.type === 'child' && profile.age && (
              <span className="text-xs mt-1">{profile.age} years old</span>
            )}
          </Button>
        ))}
      </div>
      
      <Button 
        variant="outline" 
        className="mx-auto block mt-6"
        onClick={() => {/* Would navigate to add profile page */}}
      >
        Add Profile
      </Button>
    </div>
  );
};

export default ProfileSelector;
