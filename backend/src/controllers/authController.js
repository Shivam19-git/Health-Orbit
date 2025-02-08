const bcrypt = require('bcryptjs'); // for hashing password 
const jwt = require('jsonwebtoken'); // for generating token for successful login
const User = require('../models/userModel');

const register = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashPassword,
            role
        });
        await newUser.save();
        res.status(201).json({ message: `User registered successfully: ${newUser.email}` });

    } catch (error) {
        res.status(500).json({ message: "Error in user registration", error: error.message });
        console.log("Error in user registration", error);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });

    } catch (error) {
        res.status(500).json({ message: "Error in user login", error: error.message });
        console.log("Error in user login", error);
    }
};

module.exports = { register, login };