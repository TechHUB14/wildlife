import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import "../assets/AllBirds.css"; // Reusing the same CSS for consistency

export const AllAnimals = () => {
    const navigate = useNavigate();
    const { countryName, stateName } = useParams();
    const [searchQuery, setSearchQuery] = useState("");
    const [animals, setAnimals] = useState([]);

    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/animals", {
                    params: {
                        country: countryName,
                        state: stateName || undefined,
                    },
                });
                setAnimals(response.data);
            } catch (error) {
                console.error("Error fetching animals:", error);
            }
        };

        fetchAnimals();
    }, [countryName, stateName]);

    const filteredAnimals = animals.filter((animal) =>
        animal.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="birds-layout">
            {/* Sidebar */}
            <div className="b2">
                <h3>Animals of {stateName ? `${stateName}, ${countryName}` : countryName} 🐾</h3>
                <p>Explore the fascinating wild animals found in {stateName ? `${stateName}, ${countryName}` : countryName}.</p>
                <input
                    type="text"
                    placeholder="Search animals..."
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
                <h2>Animals Found in {stateName ? `${stateName}, ${countryName}` : countryName}</h2>
                <div className="bird-cards">
                    {filteredAnimals.length > 0 ? (
                        filteredAnimals.map((animal, index) => (
                            <motion.div
                                key={index}
                                className="bird-card"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <img
                                    src={`${animal.image}?q=80&w=800&auto=format&fit=crop`}
                                    alt={animal.name}
                                />
                                <div className="bird-info">
                                    <h4>{animal.name}</h4>
                                    <p><strong>State:</strong> {animal.state}</p>
                                    <a href={animal.wiki} target="_blank" rel="noopener noreferrer">
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
                                🐾
                            </motion.div>
                            <h3>Oops! No animals found in {stateName ? `${stateName}, ${countryName}` : countryName}.</h3>
                            <p>Try a different search or explore another state.</p>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};
