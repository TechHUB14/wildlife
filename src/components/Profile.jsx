import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LogOut,
  UploadCloud,
  LayoutDashboard,
  Image,
  Settings,
} from "lucide-react";
import "../assets/Profile.css";

export const Profile = () => {
  const { email } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const classMap = {
    Animals: "animal-card",
    Birds: "bir-card",
    Aquatic: "aquatic-card",
    Amphibians: "amphi-card",
    Reptiles: "reptile-card",
    Insects: "insec-card",
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/email/${email}`
        );
        setUser(res.data);
      } catch (err) {
        setError("Failed to load user data");
      }
    };
    fetchUser();
  }, [email]);

  if (error)
    return <div className="text-red-600 text-center mt-10">{error}</div>;
  if (!user)
    return (
      <div className="text-center mt-10 text-gray-600">Loading profile...</div>
    );

  // Mock upload stats (replace with API data if available)
  const uploadStats = [
    { label: "Animals", count: 23, color: "text-emerald-600" },
    { label: "Birds", count: 15, color: "text-blue-600" },
    { label: "Aquatic", count: 6, color: "text-purple-600" },
    { label: "Amphibians", count: 4, color: "text-pink-600" },
    { label: "Reptiles", count: 8, color: "text-yellow-600" },
  ];

  return (
    <div className="local-layout">
      <motion.div
        className="sidebarr"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="profile-card">
          <img
            src="https://i.imgur.com/6VBx3io.png"
            alt="Profile"
            className="profile-image"
          />
          <h1>{user.fullName}</h1>
          <h3>{user.nickName}</h3>
          <h3>{user.email}</h3>
        </div>

        <button className="p11">DashBoard</button>
        <button className="p12">Uploads/Gallery</button>
        <button className="p14">Settings</button>
        <button className="p16" onClick={() => { navigate('/uploads') }}>Upload</button>
        <button
          className="p15"
          onClick={() => {
            localStorage.removeItem("token"); // or remove user/email if that's what you store
            navigate("/login"); // or "/" if you want to redirect to home
          }}
        >
          Logout
        </button>
      </motion.div>
      <motion.div
        className="main-contentt"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Welcome {user.fullName}</h2>

        <div className="upload-stats">
          <h3>Upload Stats</h3>


          <div className="card-wrapper">
            {uploadStats.map((stat, index) => (
              <motion.div
                key={index}
                className={`card ${classMap[stat.label] || ""}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="label">{stat.label}</span>
                <span className="count">{stat.count}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
