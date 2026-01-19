
import { SortOrder } from '../types';
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Hostel, University, CommunityPost, Student } from '../types';
import { api } from '../services/api';

interface HostelQueryParams {
  universityId?: string;
  searchQuery?: string;
  sortBy?: SortOrder;
}

interface AppContextType {
  hostels: Hostel[];
  universities: University[];
  posts: CommunityPost[];
  students: Student[];
  loading: boolean;
  isAdmin: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  setIsAdmin: (val: boolean) => void;
  refreshData: () => Promise<void>;
  fetchHostels: (params: HostelQueryParams) => Promise<void>;
  saveHostel: (h: Hostel) => Promise<void>;
  deleteHostel: (id: string) => Promise<void>;
  savePost: (p: CommunityPost) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  saveStudent: (s: Student) => Promise<void>;
  deleteStudent: (id: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchHostels = useCallback(async (params: HostelQueryParams) => {
    setLoading(true);
    try {
      const results = await api.getHostels(params);
      setHostels(results);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshData = useCallback(async () => {
    setLoading(true);
    try {
      const [h, u, p, s] = await Promise.all([
        api.getHostels(), // Default fetch
        api.getUniversities(),
        api.getPosts(),
        api.getStudents()
      ]);
      setHostels(h);
      setUniversities(u);
      setPosts(p);
      setStudents(s);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const saveHostel = useCallback(async (h: Hostel) => { await api.saveHostel(h); await refreshData(); }, [refreshData]);
  const deleteHostel = useCallback(async (id: string) => { await api.deleteHostel(id); await refreshData(); }, [refreshData]);
  const savePost = useCallback(async (p: CommunityPost) => { await api.savePost(p); await refreshData(); }, [refreshData]);
  const deletePost = useCallback(async (id: string) => { await api.deletePost(id); await refreshData(); }, [refreshData]);
  const saveStudent = useCallback(async (s: Student) => { await api.saveStudent(s); await refreshData(); }, [refreshData]);
  const deleteStudent = useCallback(async (id: string) => { await api.deleteStudent(id); await refreshData(); }, [refreshData]);

  const value = useMemo(() => ({ 
    hostels, universities, posts, students, loading, isAdmin, setIsAdmin, 
    searchQuery, setSearchQuery, fetchHostels,
    refreshData, saveHostel, deleteHostel, savePost, deletePost, saveStudent, deleteStudent
  }), [
    hostels, universities, posts, students, loading, isAdmin, 
    searchQuery, fetchHostels, refreshData, saveHostel, deleteHostel, savePost, deletePost, saveStudent, deleteStudent
  ]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
