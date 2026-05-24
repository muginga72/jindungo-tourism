// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import client from "../api/client";

export default function Profile() {
  const { user, logout, reload } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(user);

  useEffect(() => setProfile(user), [user]);

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await client.get("/auth/getMe");
      setProfile(res.data);
    } catch (e) {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      {profile ? (
        <div className="profile-card">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone || "-"}</p>
          <p><strong>Role:</strong> {profile.role}</p>
          {profile.profilePhoto && <img src={profile.profilePhoto.startsWith("http") ? profile.profilePhoto : `${import.meta.env.VITE_API_BASE || "http://localhost:5000/api"}/../${profile.profilePhoto}`} alt="profile" style={{maxWidth:200}} />}
          <div style={{marginTop:12}}>
            <button onClick={refresh} disabled={loading}>{loading ? "Refreshing..." : "Refresh"}</button>
            <button onClick={logout} style={{marginLeft:8}}>Logout</button>
          </div>
        </div>
      ) : (
        <div>No profile loaded</div>
      )}
    </div>
  );
}