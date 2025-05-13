import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import "../assets/AllBirds.css";

export const AllBirds = () => {
    const navigate = useNavigate();
    const { countryName, stateName } = useParams();
    const [searchQuery, setSearchQuery] = useState("");
    const [birds, setBirds] = useState([]);

    useEffect(() => {
        const fetchBirds = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/birds", {
                    params: {
                        country: countryName,
                        state: stateName || undefined,
                    },
                });
                setBirds(response.data);
            } catch (error) {
                console.error("Error fetching birds:", error);
            }
        };

        fetchBirds();
    }, [countryName, stateName]);

    const filteredBirds = birds.filter((bird) =>
        bird.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="birds-layout">
            {/* Sidebar */}
            <div className="b2">
                <h3>Birds of {stateName ? `${stateName}, ${countryName}` : countryName} 🐦</h3>
                <p>Discover the colorful and melodious birds found in {stateName ? `${stateName}, ${countryName}` : countryName}.</p>
                <input
                    type="text"
                    placeholder="Search birds..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                <button className="back-button" onClick={() => navigate(-1)}>
                    ⬅ Back
                </button>
            </div>

            {/* Main content */}
            <div className="main-content">
                <h2>Birds Found in {stateName ? `${stateName}, ${countryName}` : countryName}</h2>
                <div className="bird-cards">
                    {filteredBirds.length > 0 ? (
                        filteredBirds.map((bird, index) => (
                            <motion.div
                                key={index}
                                className="bird-card"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <img
                                    src={`${bird.image}?q=80&w=800&auto=format&fit=crop`}
                                    alt={bird.name}
                                />
                                <div className="bird-info">
                                    <h4>{bird.name}</h4>
                                    <p><strong>State:</strong> {bird.state}</p>
                                    <a href={bird.wiki} target="_blank" rel="noopener noreferrer">
                                        Learn More
                                    </a>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="no-birds"
                        >
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 1,
                                }}
                                style={{ fontSize: "48px", marginBottom: "10px" }}
                            >
                                😔
                            </motion.div>
                            <h3>Oops! No birds found in {stateName ? `${stateName}, ${countryName}` : countryName}.</h3>
                            <p>Try a different search or explore another state.</p>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};
