import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../assets/Home.css";

export const Home = () => {
  const navigate = useNavigate();

  const goToLocal = () => {
    navigate("/local");
  };
  const goToCountry = () => {
    navigate("/country");
  };
  return (
    <div className="bg">

      <div className="header">
        <motion.div
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.95 }}
        >
          <h1>THE UNSPEAKERS</h1>
          <h4>"But we Walk, Fly and Swim"</h4>
          <h4>Explore the Wildlife around You!</h4>
        </motion.div>
        <motion.button
          className="upload-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/login")}
        >
          Want to Upload your Captures!
        </motion.button>

      </div>
      <div className="main">
        <motion.div
          className="card-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="image-card world"
            onClick={()=>navigate("/sel")}
          >
            <span>World</span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="image-card country"
            onClick={goToCountry}
          >
            <span>Country</span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="image-card local"
            onClick={goToLocal}
          >
            <span>Local</span>
          </motion.div>

        </motion.div>
      </div>

    </div>
  );
};
