import React, { useState } from "react";
import { motion } from "framer-motion";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import "../assets/Country.css";

// Compressed country data
const countryData = [
  ["India", "/india", "photo-1605092676920-8ac5ae40c7c8"],
  ["Brazil", "/brazil", "photo-1616128417743-c3a6992a65e7"],
  ["Kenya", "/kenya", "photo-1552410260-0fd9b577afa6"],
  ["Australia", "/australia", "photo-1600837993192-bd9ac0e15366"],
  ["Canada", "/canada", "photo-1682662440684-233fcfb057be"],
  ["South Africa", "/south-africa", "photo-1716535680493-614ccebb5dd3"],
  ["United States", "/united-states", "photo-1672971743436-abfea99a5143"],
  ["China", "/china", "photo-1572295269175-f18627ae9c41"],
  ["Russia", "/russia", "photo-1726335849487-fd5d3b63b87c"],
  ["Indonesia", "/indonesia", "photo-1562578057-3ca1f7815237"],
  ["Mexico", "/mexico", "photo-1622116626849-8566a95d3aac"],
  ["Peru", "/peru", "photo-1649603713655-9104b0d11815"],
  ["Thailand", "/thailand", "photo-1732272823211-461b82a9a515"],
  ["Malaysia", "/malaysia", "photo-1702878650793-0fa84f2f3760"],
  ["Nepal", "/nepal", "photo-1590743376493-8584a7a83a0d"],
];

const unsplashPrefix = "https://images.unsplash.com/";
const querySuffix = "?q=80&w=2000&auto=format&fit=crop";

const countries = countryData.map(([name, link, photoId]) => ({
  name,
  link,
  image: `${unsplashPrefix}${photoId}${querySuffix}`,
}));

export const Country = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const navigate = useNavigate();

  const filteredCountries = selectedCountry
    ? countries.filter((country) =>
        country.name.toLowerCase().includes(selectedCountry.toLowerCase())
      )
    : countries;

  const countryOptions = countries.map((country) => ({
    label: country.name,
    value: country.name,
  }));

  return (
    <div className="country-layout">
      <motion.div
        className="sidebar"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h3>🌍 Explore by Country</h3>
        <Select
          options={countryOptions}
          onChange={(selected) => setSelectedCountry(selected?.value)}
          isClearable
          placeholder="Search for a country..."
          className="search-dropdown"
        />
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
        className="main-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Discover the Country's Biodiversity</h2>
        <h5>The Image Shows National Animals of Respective Countries</h5>

        <div className="card-wrapper">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country, index) => (
              <motion.div
                key={index}
                className="country-card"
                style={{ backgroundImage: `url(${country.image})` }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/country/${country.name}`)}
              >
                <span>{country.name}</span>
              </motion.div>
            ))
          ) : (
            <p>No countries found.</p>
          )}
        </div>

       
      </motion.div>
    </div>
  );
};
