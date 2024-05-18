const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

/*
// Generate a random string of specified length
function generateRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') // Convert to hexadecimal format
        .slice(0, length); // Trim to desired length
}

// Generate a secure secret key
const secretKey = generateRandomString(32); // Example: Generate a 32-character key

console.log("Generated Secret Key:", secretKey);
*/

// api for getting all users' info
const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//api for getting one user by id
const getOneUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = await User.findById(id);
        res.status(200).json(userId);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const signUp = async (req, res) => {
    try {
        // Check if the username already exists
        const existingUsername = await User.findOne({ userName: req.body.userName });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Check if the email already exists
        const existingEmail = await User.findOne({ email: req.body.email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Otherwise proceed to create a new user:

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds); 
        
        // Create the new user with the hashed password
        const newUser = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            userName: req.body.userName,
            phoneNumber: req.body.phoneNumber,
            password: hashedPassword,
        });
        res.status(200).json(newUser)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


const loginUser = async (req, res) => {
    try {
        const { userName, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // If the username and password are correct, generate a JWT token
        const token = jwt.sign({ userId: user._id }, "2bfdfe39d95b014fef712d5fb8682775", { expiresIn: '1h' });

        // Send the token in the response
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        let updateData = req.body;

        // Check if the request includes a new password
        if (updateData.password) {
            // Hash the new password
            const saltRounds = 10;
            updateData.password = await bcrypt.hash(updateData.password, saltRounds);
        }

        const userIdForUpdate = await User.findByIdAndUpdate(id, updateData, { new: true });

        if (!userIdForUpdate) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(userIdForUpdate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const userIdForDelete = await User.findByIdAndDelete(id); 
        if(!userIdForDelete) {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


module.exports = {
    getUsers,
    getOneUserById,
    signUp,
    loginUser,
    updateUserById,
    deleteUserById
}

