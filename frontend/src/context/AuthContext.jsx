// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import client from "../api/client";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadMe = async () => {
    try {
      const res = await client.get("/auth/getMe");
      setUser(res.data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    loadMe();
  }, []);

  const login = async ({ email, password }) => {
    const res = await client.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const register = async ({ name, email, phone, password }) => {
    const res = await client.post("/auth/register", { name, email, phone, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const logout = async () => {
    try {
      await client.post("/auth/logout");
    } catch (e) {
      // ignore
    }
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, reload: loadMe }}>
      {children}
    </AuthContext.Provider>
  );
};