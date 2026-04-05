"use client";
import { createContext, useState, ReactNode } from "react";

interface HistoryItem {
  date: string;
  time: string;
  score: number;
  _id: string;
}

interface User {
  _id: string;
  username: string;
  avatar: string;
  level: string;
  topscore: number;
  history: HistoryItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;