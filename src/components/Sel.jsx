import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate} from "react-router-dom";

import "../assets/Type.css";

// List of countries for dropdown


export const Sel = () => {
    const navigate = useNavigate();
    
    

    // Handle country selection from dropdown
   

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
            

                <h2>You are now Exploring Whole World</h2>
                <h2>🌿 Discover by Selecting the Group of Creatures</h2>
                <div className="card-wrapper">
                    <motion.div className="card animal-card" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate("/alla")}>
                        <span>Animals</span>
                    </motion.div>
                    <motion.div className="card bir-card" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/allb')}>
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
