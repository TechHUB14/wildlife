import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import "../assets/ALLA.css"; // You can rename this to AllAnimals.css if needed

export const ALLA = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [allAnimals, setAllAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all animals on component mount
    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/animals"); // <-- Updated endpoint
                setAllAnimals(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch animals:", err);
                setError("Failed to fetch animals");
                setLoading(false);
            }
        };
        fetchAnimals();
    }, []);

    // Filter animals based on search query
    const filteredAnimals = allAnimals.filter(
        (animal) =>
            animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            animal.country.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="birds-layout">
            {/* Sidebar */}
            <div className="sidebar">
                <h3>Explore Animals Around the World! 🐾</h3>
                <p>
                    Animals are multicellular organisms of the kingdom Animalia. They are diverse in form, habitat, and behavior, ranging from domestic pets to wild jungle creatures...
                </p>

                {/* Search bar */}
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by animal or country..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="back-button" onClick={() => navigate(-1)}>
                    ⬅ Back
                </button>
            </div>

            {/* Main content */}
            <div className="main-content">
                <h2>Animals from Different Countries</h2>

                {/* Loading or Error state */}
                {loading ? (
                    <p>Loading animals...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <div className="bird-cards">
                        {filteredAnimals.length > 0 ? (
                            filteredAnimals.map((animal, index) => (
                                <motion.div
                                    key={index}
                                    className="bird-card"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <img src={`${animal.image}?q=80&w=800&auto=format&fit=crop`} alt={animal.name} />
                                    <div className="bird-info">
                                        <h4>{animal.name}</h4>
                                        <p><strong>Country:</strong> {animal.country}</p>
                                        {animal.wiki ? (
                                            <a href={animal.wiki} target="_blank" rel="noopener noreferrer">
                                                Learn More
                                            </a>
                                        ) : (
                                            <p style={{ fontSize: "12px", color: "gray" }}>No Wiki link available</p>
                                        )}
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <p>No animals found for "{searchQuery}".</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
