import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { motion } from "framer-motion";
import "../assets/SelC.css";

// Sample state data for demonstration
const stateData = {
    India: [
        ["Karnataka", "photo-1569571665379-f952b753ccc7"],
        ["Kerala", "photo-1593417033852-66b46de814b8"],
        ["Andhra Pradesh", "photo-1701309171892-ddd6161fb004"],
    ],
    Brazil: [
        ["Amazonas", "photo-1549880187-2456f3a8d3c1"],
        ["São Paulo", "photo-1528360983277-13d401cdc186"],
    ],
    Australia: [
        ["Queensland", "photo-1562147209-0f3836d934ef"],
        ["Victoria", "photo-1526481280691-4022b8f3aa9e"],
    ],
};

const unsplashPrefix = "https://images.unsplash.com/";
const querySuffix = "?q=80&w=2000&auto=format&fit=crop";

export const SelC = () => {
    const { countryName } = useParams();
    const states = stateData[countryName] || [];
    const navigate = useNavigate();
    const [selectedState, setSelectedState] = useState(null);

    const filteredStates = selectedState
        ? states.filter(([state]) =>
            state.toLowerCase().includes(selectedState.toLowerCase())
        )
        : states;

    const stateOptions = states.map(([state]) => ({
        label: state,
        value: state,
    }));

    return (
        <div className="a1">
            <motion.div
                className="a2"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <h3>Welcome to {countryName}🌍</h3>
                <Select
                    options={stateOptions}
                    onChange={(selected) => setSelectedState(selected?.value)}
                    isClearable
                    placeholder={`Search states in ${countryName}...`}
                    className="a3"
                />
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="a4"
                    onClick={() => navigate(-1)}
                >
                    ⬅ Back to Previous
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="a4"
                    onClick={() => navigate(`/type/${countryName}`)}
                >
                    Explore Whole {countryName}
                </motion.button>
            </motion.div>

            <motion.div
                className="a5"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="s">Explore States of {countryName}</h2>
                <div className="a6">
                    {filteredStates.length > 0 ? (
                        filteredStates.map(([state, imgId], index) => (
                            <motion.div
                                key={index}
                                className="a7"
                                style={{
                                    backgroundImage: `url(${unsplashPrefix}${imgId}${querySuffix})`,
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate(`/type/${countryName}/${state}`)} // ✅ Add navigation
                            >
                                <span>{state}</span>
                            </motion.div>
                        ))
                    ) : (
                        <p>No states found.</p>
                    )}
                </div>
            </motion.div>
        </div>
    );
};
