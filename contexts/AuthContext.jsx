"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// LocalStorage keys
const KEY = "demo_users_v1";
const SESSION = "demo_session_v1";

// Context (no TS types in JS)
const Ctx = createContext(null);

// Helpers
function getUsers() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function setUsers(u) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(u));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load session on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const u = localStorage.getItem(SESSION);
      if (u) setUser(JSON.parse(u));
    }
  }, []);

  const login = async (email, _password) => {
    const u = getUsers().find(
      (x) => x.email.toLowerCase() === email.toLowerCase()
    );
    if (!u) throw new Error("No account found for this email");
    localStorage.setItem(SESSION, JSON.stringify(u));
    setUser(u);
  };

  const register = async (name, email, _password) => {
    const users = getUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("Email already registered");
    }
    const nu = {
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now()),
      name,
      email,
    };
    users.push(nu);
    setUsers(users);
    localStorage.setItem(SESSION, JSON.stringify(nu));
    setUser(nu);
  };

  const logout = () => {
    localStorage.removeItem(SESSION);
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, register, logout }), [user]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

// (Optional) default export—use if you prefer: import AuthProvider from '@/contexts/AuthContext'
export default AuthProvider;
