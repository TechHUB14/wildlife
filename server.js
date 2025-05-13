import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import axios from 'axios';  // Import axios for API calls

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://vishnuyadavmn14:Suri140203@wildlife14.xk4uojq.mongodb.net/?retryWrites=true&w=majority&appName=wildlife14', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("Failed to connect to MongoDB", err));

// Bird Schema and Model
const birdSchema = new mongoose.Schema({
    name: String,
    image: String,
    wiki: String,
    country: String,
    state: String,
    location: String,
});

const Bird = mongoose.model('Bird', birdSchema);

// User Schema and Model (No password encryption)
const userSchema = new mongoose.Schema({
    fullName: String,
    nickName: String,
    email: { type: String, unique: true },
    password: String,  // Plain-text password
});

const User = mongoose.model('User', userSchema);

// API endpoint to get birds with optional filtering by country, state, and location
app.get('/api/birds', async (req, res) => {
    const { country, state, location } = req.query;

    // Construct filter object based on query parameters
    const filter = {};
    if (country) filter.country = country;
    if (state) filter.state = state;
    if (location) filter.location = { $regex: new RegExp(location, 'i') };  // Case-insensitive location filter

    try {
        const birds = await Bird.find(filter);  // Fetch birds based on filter
        res.json(birds);  // Send the birds as JSON response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch birds' });
    }
});

//animals

const animalSchema = new mongoose.Schema({
    name: String,
    image: String,
    wiki: String,
    country: String,
    state: String,
    location: String,
});
const Animal = mongoose.model('Animal', animalSchema);


app.get('/api/animals', async (req, res) => {
    const { country, state, location } = req.query;
    const filter = {};
    if (country) filter.country = country;
    if (state) filter.state = state;
    if (location) filter.location = { $regex: new RegExp(location, 'i') };

    try {
        const animals = await Animal.find(filter);
        res.json(animals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch animals' });
    }
});
















// API endpoint for user registration
app.post('/api/register', async (req, res) => {
    const { fullName, nickName, email, password, confirmPassword } = req.body;

    // Validation: Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    try {
        // Check if the email or nickName already exists
        const existingUser = await User.findOne({ $or: [{ email }, { nickName }] });

        if (existingUser) {
            // If either email or nickName is already taken
            return res.status(400).json({ error: "Email or Nickname is already registered" });
        }

        // Create a new user if no conflict
        const newUser = new User({
            fullName,
            nickName,
            email,
            password,  // Save the plain-text password (consider hashing in production)
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

// API endpoint for user login with reCAPTCHA verification
app.post('/api/login', async (req, res) => {
    const { email, password, captchaResponse } = req.body;

    const secretKey = '6Lf9DSkrAAAAAPmtIbZjMYkC5Aos9U_AFLWa6yxz'; // reCAPTCHA secret key

    try {
        // Verify reCAPTCHA
        const verificationResponse = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify`,
            null,
            {
                params: {
                    secret: secretKey,
                    response: captchaResponse,
                },
            }
        );

        if (!verificationResponse.data.success) {
            return res.status(400).json({ error: 'Invalid reCAPTCHA. Please try again.' });
        }

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Check password (plain-text; use bcrypt in production)
        if (user.password !== password) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Successful login
        return res.status(200).json({ message: 'Login successful', user });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error during login' });
    }
});

app.get("/api/user/email/:email", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Server running on PORT 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
