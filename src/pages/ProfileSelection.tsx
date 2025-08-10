import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileSelector from '@/components/ProfileSelector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { getParentProfile, getChildProfiles, hasChildProfiles } from '@/lib/profileStore';

const ProfileSelection: React.FC = () => {
  const navigate = useNavigate();
  const [pinOpen, setPinOpen] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const parent = getParentProfile();
  const children = getChildProfiles();

  useEffect(() => {
    // If there are no child profiles, force onboarding
    if (!hasChildProfiles()) {
      navigate('/onboarding', { replace: true });
    }
  }, [navigate]);

  const profiles = useMemo(() => {
    const list: Array<{ id: string; name: string; type: 'parent' | 'child'; age?: number; avatar?: string }> = [];
    if (parent) list.push({ id: parent.id, name: parent.name || 'Parent', type: 'parent', avatar: parent.avatar });
    for (const c of children) {
      list.push({ id: c.id, name: c.name || 'Child', type: 'child', avatar: c.avatar });
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-yellow-50/40 py-10">
      <div className="max-w-xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6 font-playfair">Who\'s learning today?</h1>
        <ProfileSelector profiles={profiles} onSelect={handleSelect} />
      </div>

      <Dialog open={pinOpen} onOpenChange={setPinOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Parent PIN</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="4-digit PIN"
              maxLength={4}
              pattern="[0-9]*"
              inputMode="numeric"
            />
            {pinError && <p className="text-sm text-red-600">{pinError}</p>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPinOpen(false)}>Cancel</Button>
            <Button onClick={confirmPin}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileSelection;
