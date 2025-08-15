import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileSelector from '@/components/ProfileSelector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { getParentProfile, getChildProfiles, hasChildProfiles } from '@/lib/profileStore';
import neugieLogo from "@/assets/neugie-logo.png";

const ProfileSelection: React.FC = () => {
  const navigate = useNavigate();
  const [pinOpen, setPinOpen] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const parent = getParentProfile();
  const children = getChildProfiles();

  useEffect(() => {
    document.title = 'Select Profile | Neugie';
    // If there are no child profiles, force onboarding
    if (!hasChildProfiles()) {
      navigate('/onboarding', { replace: true });
    }
  }, [navigate]);

  const profiles = useMemo(() => {
    const calculateAge = (dateOfBirth: string) => {
      if (!dateOfBirth) return undefined;
      const today = new Date();
      const birth = new Date(dateOfBirth);
      const age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      return monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate()) ? age - 1 : age;
    };

    const list: Array<{ id: string; name: string; type: 'parent' | 'child'; age?: number; avatar?: string }> = [];
    if (parent) list.push({ id: parent.id, name: parent.name || 'Parent', type: 'parent', avatar: parent.avatar });
    for (const c of children) {
      list.push({ 
        id: c.id, 
        name: c.name || 'Child', 
        type: 'child', 
        age: calculateAge(c.dateOfBirth), 
        avatar: c.avatar 
      });
    }
    return list;
  }, [parent, children]);

  const handleSelect = (profile: { id: string; name: string; type: 'parent' | 'child' }) => {
    if (profile.type === 'parent') {
      setPinInput('');
      setPinError('');
      setPinOpen(true);
    } else {
      toast.success(`Welcome, ${profile.name}!`);
      navigate('/kids-home');
    }
  };

  const confirmPin = () => {
    if (!parent) return;
    if (pinInput === parent.pin) {
      toast.success('Parent verified');
      setPinOpen(false);
      navigate('/home');
    } else {
      setPinError('Incorrect PIN. Try again.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      confirmPin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50/30 to-orange-50/50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-orange-100/20 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-center">
          <div className="flex items-center gap-4">
            <img 
              src={neugieLogo} 
              alt="Neugie Logo" 
              className="w-12 h-12"
            />
            <div className="text-center">
              <h1 className="brand-heading text-3xl">
                <span className="brand-accent">Neu</span>gie
              </h1>
              <p className="text-sm text-gray-600 font-medium">Choose your profile</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="brand-heading text-4xl mb-4">
              Who's learning <span className="brand-accent">today</span>?
            </h2>
            <p className="brand-card-text text-lg opacity-80">
              Select your profile to continue your educational journey
            </p>
          </div>
          
          <ProfileSelector profiles={profiles} onSelect={handleSelect} />
        </div>
      </div>

      {/* PIN Dialog */}
      <Dialog open={pinOpen} onOpenChange={setPinOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="brand-card-title text-center text-xl">
              Enter Parent <span className="brand-accent">PIN</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="text-center mb-4">
              <p className="brand-card-text text-sm opacity-70">
                Please enter your 4-digit PIN to access parent features
              </p>
            </div>
            <Input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter 4-digit PIN"
              maxLength={4}
              pattern="[0-9]*"
              inputMode="numeric"
              className="text-center text-2xl tracking-widest rounded-xl border-orange-200 focus:border-orange-400"
              autoFocus
            />
            {pinError && (
              <div className="text-center">
                <p className="text-sm text-red-600 font-medium">{pinError}</p>
              </div>
            )}
          </div>
          <DialogFooter className="gap-3">
            <Button 
              variant="outline" 
              onClick={() => setPinOpen(false)}
              className="border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button 
              onClick={confirmPin}
              className="bg-orange-500 hover:bg-orange-600 text-white"
              disabled={pinInput.length !== 4}
            >
              Verify PIN
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileSelection;