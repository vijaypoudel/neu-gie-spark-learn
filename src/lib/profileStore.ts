// Utilities for storing and retrieving parent/child profiles in localStorage
// This is a lightweight front-end store. For production, move to Supabase auth + DB.

export type ParentProfile = {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  pin: string; // 4-digit numeric PIN
  avatar?: string;
};

export type ChildProfile = {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  curriculum: string;
  subjects: string[];
  passions: string[];
  passcode: string; // 8-digit
  avatar?: string;
};

const PARENT_KEY = 'cb_parent_profile';
const CHILDREN_KEY = 'cb_child_profiles';

export const saveParentProfile = (data: Partial<ParentProfile>) => {
  const profile: ParentProfile = {
    id: 'parent-1',
    name: data.name || '',
    email: data.email || '',
    dateOfBirth: data.dateOfBirth || '',
    pin: data.pin || '',
    avatar: data.avatar,
  };
  localStorage.setItem(PARENT_KEY, JSON.stringify(profile));
  return profile;
};

export const getParentProfile = (): ParentProfile | null => {
  const raw = localStorage.getItem(PARENT_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw) as ParentProfile; } catch { return null; }
};

export const addChildProfile = (data: Partial<ChildProfile>) => {
  const child: ChildProfile = {
    id: `child-${Date.now()}`,
    name: data.name || '',
    dateOfBirth: data.dateOfBirth || '',
    gender: data.gender || '',
    curriculum: data.curriculum || '',
    subjects: data.subjects || [],
    passions: data.passions || [],
    passcode: data.passcode || '',
    avatar: data.avatar,
  };
  const children = getChildProfiles();
  children.push(child);
  localStorage.setItem(CHILDREN_KEY, JSON.stringify(children));
  return child;
};

export const getChildProfiles = (): ChildProfile[] => {
  const raw = localStorage.getItem(CHILDREN_KEY);
  if (!raw) return [];
  try { return JSON.parse(raw) as ChildProfile[]; } catch { return []; }
};

export const hasChildProfiles = () => getChildProfiles().length > 0;
