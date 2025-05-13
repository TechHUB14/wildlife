import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import "../assets/AllBirds.css"; // same CSS

export const ALLB = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [allBirds, setAllBirds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all birds on component mount
    useEffect(() => {
        const fetchBirds = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/birds");
                setAllBirds(res.data); // Set the fetched birds in state
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch birds:", err);
                setError("Failed to fetch birds"); // Set error message
                setLoading(false);
            }
        };
        fetchBirds();
    }, []);

    // Filter birds based on search query (search by bird name or country name)
    const filteredBirds = allBirds.filter(
        (bird) =>
            bird.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            bird.country.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="birds-layout">
            {/* Sidebar */}
            <div className="sidebar">
                <h3>Explore Birds Around World!! 🦜</h3>
                <p>
                    Birds are warm-blooded vertebrates that belong to the class Aves. They are characterized by the presence of feathers, a beak without teeth, and a lightweight but strong skeletal structure...
                    {/* Your full description */}
                </p>

                {/* Search bar */}
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by bird or country..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                />
                <button className="back-button" onClick={() => navigate(-1)}>
                    ⬅ Back
                </button>
            </div>

            {/* Main content */}
            <div className="main-content">
                <h2>Birds from Different Countries</h2>

                {/* Loading State */}
                {loading ? (
                    <p>Loading birds...</p>
                ) : error ? (
                    <p>{error}</p>  // Show error message if the fetch failed
                ) : (
                    <div className="bird-cards">
                        {filteredBirds.length > 0 ? (
                            filteredBirds.map((bird, index) => (
                                <motion.div
                                    key={index}
                                    className="bird-card"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <img src={`${bird.image}?q=80&w=800&auto=format&fit=crop`} alt={bird.name} />
                                    <div className="bird-info">
                                        <h4>{bird.name}</h4>
                                        <p><strong>Country:</strong> {bird.country}</p>
                                        {bird.wiki ? (
                                            <a href={bird.wiki} target="_blank" rel="noopener noreferrer">
                                                Learn More
                                            </a>
                                        ) : (
                                            <p style={{ fontSize: "12px", color: "gray" }}>No Wiki link available</p>
                                        )}

                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <p>No birds found for "{searchQuery}".</p>  // No birds found
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
