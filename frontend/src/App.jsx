// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Profile from "./pages/Profile";
// import ProtectedRoute from "./pages/ProtectedRoute";
// import NavBar from "./components/NavBar";
// import HomePage from "./pages/public/HomePage";
// import UserDashboard from "./pages/UserDashboard";
import "./styles.css";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      {/*  <NavBar />
         <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          </Routes>
        </main> */}
      </BrowserRouter>
    </AuthProvider>
  );
}
