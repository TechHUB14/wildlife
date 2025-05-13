import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import "../assets/Register.css";

export const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate confirm password
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Send registration request to backend
    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        fullName,
        nickName,
        email,
        password,
        confirmPassword,
      });
      alert(response.data.message);
      navigate("/login");  // Redirect to login page after successful registration
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred during registration");
    }
  };

  // Reset the form and clear errors
  const handleReset = () => {
    setFullName("");
    setNickName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError(null);
  };

  return (
    <div className="login-bg">
      <motion.div
        className="login-container"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          GEAR UP YOUR CAMERAS!
        </motion.h2>
        <form onSubmit={handleSubmit}>
          <motion.input
            type="text"
            placeholder="Full Name"
            className="login-input"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            whileFocus={{ scale: 1.02 }}
          />
          <motion.input
            type="text"
            placeholder="Nick Name"
            className="login-input"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
            whileFocus={{ scale: 1.02 }}
          />
          <motion.input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            whileFocus={{ scale: 1.02 }}
          />
          <motion.input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            whileFocus={{ scale: 1.02 }}
          />
          <motion.input
            type="password"
            placeholder="Confirm Password"
            className="login-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            whileFocus={{ scale: 1.02 }}
          />

          {error && <p className="error-message">{error}</p>}

          <motion.button
            type="submit"
            className="login-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register
          </motion.button>
          <motion.button
            type="button"
            className="reset-button"
            onClick={handleReset} // Handle reset functionality
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Reset
          </motion.button>
        </form>

        <motion.button
          type="button"
          className="back-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/login")}
        >
          Back to Login
        </motion.button>
      </motion.div>
    </div>
  );
};
