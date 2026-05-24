// src/components/NavBar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    // prevent the Link from navigating immediately
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    try {
      await logout();
    } catch (err) {
      // ignore logout errors
    } finally {
      // After logout, navigate to dashboard
      navigate("/dashboard");
    }
  };

  return (
    <nav className="nav" aria-label="Main navigation">
      <Link to="/">Home</Link>

      {user ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/logout" onClick={handleLogout}>Logout</Link>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;