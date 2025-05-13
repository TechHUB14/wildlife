import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select"; // Import Select component
import "../assets/Type.css";

// List of countries for dropdown
const countryOptions = [
    { value: "India", label: "India" },
    { value: "Australia", label: "Australia" },
    { value: "Brazil", label: "Brazil" },
    // Add more countries as needed
];

export const Type = () => {
    const navigate = useNavigate();
    const { countryName, stateName } = useParams();

    const [selectedCountry, setSelectedCountry] = useState(countryName);

    // Handle country selection from dropdown
    const handleCountryChange = (selectedOption) => {
        setSelectedCountry(selectedOption.value);
        navigate(`/type/${selectedOption.value}`); // Navigate to the selected country's page
    };

    return (
        <div className="local-layout">
            <motion.div
                className="sidebarr"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <p className="p1">Animals "Explore the vast animal kingdom — from powerful land mammals to incredible sea creatures. Discover how they survive, adapt, and thrive across the globe."</p>
                <p className="p2">Birds "From the smallest hummingbirds to mighty eagles, birds captivate us with flight, song, and colorful beauty. Learn about their habitats, migration, and amazing abilities."</p>
                <p className="p">Amphibians "Amphibians live a double life — starting in water and moving to land. Meet frogs, salamanders, and newts, the sensitive indicators of Earth's health."</p>
                <p className="p4">Reptiles "Ancient, tough, and fascinating — reptiles like snakes, lizards, and crocodiles show incredible survival skills. Uncover their hidden world of scales and stealth."</p>
                <p className="p5">Insects "Small yet mighty, insects rule the natural world. From pollinating flowers to cleaning ecosystems, discover how butterflies, ants, and beetles impact our lives."</p>
                <p className="p6">Fishes "Dive into the vibrant underwater world — from tiny reef dwellers to majestic sharks. Explore the lives of fishes, the oldest and most diverse vertebrates on Earth."</p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="back-button"
                    onClick={() => navigate(-1)}
                >
                    ⬅ Back
                </motion.button>
            </motion.div>

            <motion.div
                className="main-contentt"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="dropdown-container">
                    <Select
                        options={countryOptions}
                        value={countryOptions.find(option => option.value === selectedCountry)}
                        onChange={handleCountryChange}
                        className="country-dropdown"
                        placeholder="Select Country"
                        styles={{
                            container: (base) => ({
                                ...base,
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                width: '200px',
                            }),
                        }}
                    />
                </div>

                <h2>
                    {stateName
                        ? `You are Exploring ${stateName}, ${countryName}!`
                        : `You are Exploring ${countryName}!`
                    }
                </h2>
                <h2>🌿 Discover by Selecting the Group of Creatures</h2>
                <div className="card-wrapper">
                    <motion.div className="card animal-card" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => {
                        if (stateName) {
                            navigate(`/animals/${countryName}/${stateName}`);
                        } else {
                            navigate(`/animals/${countryName}`);
                        }
                    }}>
                        <span>Animals</span>
                    </motion.div>
                    <motion.div className="card bir-card" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => {
                        if (stateName) {
                            navigate(`/allbirds/${countryName}/${stateName}`);
                        } else {
                            navigate(`/allbirds/${countryName}`);
                        }
                    }}>
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
