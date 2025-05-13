import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../assets/Uploads.css";

export const Uploads = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    state: '',
    country: '',
    type: 'bird',
    wiki: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = e => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => data.append(key, val));
      if (imageFile) {
        data.append('image', imageFile);
      }

      const res = await axios.post(`YOUR_API_URL_HERE`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.status === 201 || res.status === 200) {
        alert('Upload successful!');
        navigate(`/${formData.type}`);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to upload. Please try again.');
    }
  };


  const handleBackToHome = () => {
    navigate(-1);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      location: '',
      state: '',
      country: '',
      type: 'bird',
      wiki: ''
    });
    setImageFile(null);
  
    // Reset the file input field
    document.querySelector('input[type="file"]').value = '';
  };
  

  // Wildlife Categories Array
  const wildlifeCategories = [
    {
      imageUrl: 'https://images.unsplash.com/photo-1719439817028-34d4c81055a8?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1549366021-9f761d450615?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1497671954146-59a89ff626ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1653908344414-56ec9f440a9c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1472645977521-95bbf4f0a748?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  return (
    <div className="uploads-container">
      {/* Left Side - Image Cards in 2x3 Grid */}
      <div className="image-grid">
        {wildlifeCategories.map((category, index) => (
          <motion.div
            key={index}
            className="wildlife-category-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 120 }}
          >
            <img
              src={category.imageUrl}
              className="imgs"
              alt={`Wildlife category ${index + 1}`}
            />
          </motion.div>
        ))}
      </div>

      {/* Right Side - Form */}
      <motion.div
        className="form-container"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
      >
        <h2>Upload Your Wildlife Capture</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            className="input-field"
            onChange={handleChange}
            required
          />
          <input
            type="file"
            accept="image/png, image/jpeg"
            className="input-field"
            onChange={handleImageChange}
            required
          />
          <input
            name="location"
            placeholder="Location (Town)"
            className="input-field"
            onChange={handleChange}
          />
          <input
            name="state"
            placeholder="State"
            className="input-field"
            onChange={handleChange}
          />
          <input
            name="country"
            placeholder="Country"
            className="input-field"
            onChange={handleChange}
          />
          <input
            name="wiki"
            placeholder="Wikipedia Link"
            className="input-field"
            onChange={handleChange}
          />
          <select
            name="type"
            className="select-field"
            onChange={handleChange}
          >
            <option value="bird">Bird</option>
            <option value="animal">Animal</option>
            <option value="aquatic">Aquatic</option>
            <option value="amphibians">Amphibians</option>
            <option value="reptiles">Reptiles</option>
          </select>
          <motion.button
            type="submit"
            className="upload-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Upload
          </motion.button>
          
          {/* Reset Button */}
          <motion.button
            type="Reset"
            className="reset-button"
            onClick={handleReset}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Reset
          </motion.button>

          {/* Back to Home Button */}
          <motion.button
            type="button"
            className="back-to-home-button"
            onClick={handleBackToHome}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Profile
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
