// src/pages/UserDashboard.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import client from "../api/client";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const { user, logout, reload } = useAuth();
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // If no user, redirect to login
    if (!user) {
      navigate("/login");
      return;
    }
    fetchDashboard();
  }, [user]);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      // Example: fetch additional dashboard data from backend
      // Replace /user/dashboard with your actual endpoint if available
      const res = await client.get("/user/dashboard").catch(() => null);
      if (res && res.data) setStats(res.data);
    } catch (err) {
      // ignore non-critical errors
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      navigate("/login");
    }
  };

  return (
    <div className="container">
      <h2>Welcome, {user?.name || "User"}</h2>

      <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
        <div style={{ flex: 1, background: "#fff", padding: 16, borderRadius: 8 }}>
          <h3>Your account</h3>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Phone:</strong> {user?.phone || "-"}</p>
          <p><strong>Role:</strong> {user?.role}</p>
          <div style={{ marginTop: 12 }}>
            <button onClick={() => navigate("/profile")}>View Profile</button>
            <button onClick={() => navigate("/profile")} style={{ marginLeft: 8 }}>Edit Profile</button>
          </div>
        </div>

        <div style={{ width: 320, background: "#fff", padding: 16, borderRadius: 8 }}>
          <h3>Quick actions</h3>
          <button onClick={() => navigate("/profile")}>Manage Documents</button>
          <button onClick={() => navigate("/")} style={{ marginTop: 8, marginLeft: 8 }}>Explore Tours</button>
          <div style={{ marginTop: 12 }}>
            <button onClick={handleLogout} style={{ background: "#e53e3e" }}>Logout</button>
          </div>
        </div>
      </div>

      <section style={{ marginTop: 20 }}>
        <h3>Dashboard data</h3>
        {loading ? (
          <div>Loading...</div>
        ) : stats ? (
          <div style={{ background: "#fff", padding: 12, borderRadius: 8 }}>
            {/* Render whatever stats the backend returns */}
            <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>{JSON.stringify(stats, null, 2)}</pre>
          </div>
        ) : (
          <div style={{ background: "#fff", padding: 12, borderRadius: 8 }}>
            <p>No dashboard data available.</p>
            <button onClick={fetchDashboard}>Refresh</button>
          </div>
        )}
      </section>
    </div>
  );
}

export default UserDashboard;