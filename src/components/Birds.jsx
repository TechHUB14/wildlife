import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../assets/Birds.css";

export const Birds = () => {
  const [locationName, setLocationName] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [locationInfo, setLocationInfo] = useState("Fetching info...");
  const [birds, setBirds] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const filteredBirds = birds.filter((bird) =>
    bird.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (!navigator.geolocation) {
      setErrorMsg("Geolocation is not supported by your browser.");
    } else {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();

            const town =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.hamlet;
            const state = data.address.state;
            const country = data.address.country;

            if (town && state && country) {
              const fullLocation = `${town}, ${state}, ${country}`;
              setLocationName(fullLocation);
              setLocationInfo(`You're exploring the biodiversity around ${town}, ${state}.`);

              // ✅ Try fetching by town
              let res = await fetch(`http://localhost:5000/api/birds?location=${town}`);
              let birdsData = await res.json();

              // ❗ Fallback to state-level birds if none found
              if (!birdsData.length) {
                res = await fetch(`/api/birds?location=${encodeURIComponent(state)}`);
                birdsData = await res.json();
              }

              setBirds(birdsData);
            } else {
              setLocationName(data.display_name || "Location found");
              setLocationInfo("We couldn't fetch detailed info about this area.");
            }
          } catch (err) {
            console.error(err);
            setErrorMsg("Failed to fetch location details.");
          }
        },
        () => {
          setErrorMsg("Unable to retrieve your location.");
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    }
  }, []);

  return (
    <div className="birds-layout">
      <motion.div
        className="sidebar"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3>🕊️ Fly with Birds</h3>

        <input
          className="search-input"
          type="text"
          placeholder="Search birds..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <motion.button
          className="back-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/local")}
        >
          ⬅ Back
        </motion.button>
      </motion.div>

      <motion.div
        className="main-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>
          Meet the Birds of{" "}
          {errorMsg && <p className="error">{errorMsg}</p>}
          {locationName && <p className="location-name">{locationName}</p>}
          <p className="location-info">{locationInfo}</p>
        </h2>

        <div className="bird-cards">
          {filteredBirds.length > 0 ? (
            filteredBirds.map((bird, index) => (
              <motion.div
                key={index}
                className="bird-card"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={bird.image} alt={bird.name} />
                <div className="bird-info">
                  <h4>{bird.name}</h4>
                  <a href={bird.link} target="_blank" rel="noopener noreferrer">
                    Learn More →
                  </a>
                </div>
              </motion.div>
            ))
          ) : (
            <p>No birds found.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};
