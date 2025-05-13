import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import "../assets/Login.css";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaValue) {
      setErrorMessage("Please verify you're not a robot.");
      return;
    }

    if (!email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
        captchaResponse: captchaValue,
      });

      if (response.status === 200) {
        const userEmail = response.data.user.email;
        navigate(`/profile/${userEmail}`);
      }
    } catch (error) {
      console.error("Login error:", error.response);
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
    setErrorMessage("");
    setCaptchaValue(null);
  };

  return (
    <div className="login-bg">
      <motion.div className="login-container" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
        <motion.h2 initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          Login to Upload
        </motion.h2>

        <form onSubmit={handleSubmit}>
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

          <p><a href="/forgot-password">Forgot Password?</a></p>
          <p><a href="/register">Capturing for the First Time?</a></p>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <ReCAPTCHA
            className="recap"
            sitekey="6Lf9DSkrAAAAANvwACsImK4ietO2uOvuseu8sfyk"
            onChange={(value) => setCaptchaValue(value)}
          />

          <motion.button type="submit" className="login-button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Login
          </motion.button>

          <motion.button type="button" className="reset-button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleReset}>
            Reset
          </motion.button>
        </form>

        <motion.button type="button" className="back-button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/')}>
          Back to Home
        </motion.button>
      </motion.div>
    </div>
  );
};
