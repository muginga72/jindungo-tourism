// src/pages/public/HomePage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="home-layout">
      {/* Main Content */}
      <main className="home-content">
        <h1>Community-based Tourism in Angola</h1>
        <p>Authentic, community-based tours across Angola.</p>

        <Link to="/tours" className="browse-btn">
          Browse Tours
        </Link>
      </main>
    </div>
  );
};

export default HomePage;
