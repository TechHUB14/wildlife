import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import "../assets/Local.css";

const containerStyle = {
  width: "100%",
  height: "200px",
  marginTop: "1rem",
  borderRadius: "12px",
};

const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY"; // Replace this with your API key

export const Local = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [locationInfo, setLocationInfo] = useState("Fetching info...");
  const [locationName, setLocationName] = useState(null);
  const navigate = useNavigate();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setErrorMsg("Geolocation is not supported by your browser.");
    } else {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();

            const city =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.hamlet;
            const state = data.address.state;
            const country = data.address.country;

            if (city && state && country) {
              setLocationName(`${city}, ${state}, ${country}`);
              setLocationInfo(`Nelamangala is under Bengaluru Rural district which is in the southern part of Karnataka that surrounds the urban core of Bengaluru city...`);
            } else {
              setLocationName(data.display_name || "Location found");
              setLocationInfo("We couldn't fetch detailed info about this area.");
            }
          } catch {
            setErrorMsg("Failed to fetch location details.");
          }
        },
        () => setErrorMsg("Unable to retrieve your location."),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  return (
    <div className="local-layout">
      <motion.div
        className="sidebarr"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {errorMsg && <p className="error">{errorMsg}</p>}
        {locationName && <p className="location-name">{locationName}</p>}
        <p className="location-info">{locationInfo}</p>



        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="back-button"
          onClick={() => navigate("/")}
        >
          ⬅ Back to Home
        </motion.button>
      </motion.div>

      <motion.div
        className="main-contentt"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>🌿 Discover by Selecting the Group of Creatures</h2>
        <div className="card-wrapper">
          <motion.div className="card animal-card" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate("/animals")}>
            <span>Animals</span>
          </motion.div>
          <motion.div className="card bir-card" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate("/birds")}>
            <span>Birds</span>
          </motion.div>
          <motion.div className="card aquatic-card" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <span>Aquatic</span>
          </motion.div>
          <motion.div className="card reptile-card" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <span>Reptiles</span>
          </motion.div>
          <motion.div className="card amphi-card" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <span>Amphibians</span>
          </motion.div>
          <motion.div className="card insec-card" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <span>Insects</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
