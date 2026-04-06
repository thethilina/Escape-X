"use client";
import { createContext, useState, ReactNode, useEffect } from "react";

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
  const [user, setUserState] = useState<User | null>(null);

  // ✅ Load user from localStorage on app start
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUserState(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error("Failed to load user", err);
    }
  }, []);

  // ✅ Wrap setter to also save to localStorage
  const setUser = (user: User | null) => {
    setUserState(user);

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  };

  const logout = () => {
    setUser(null); // this will also clear localStorage
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;