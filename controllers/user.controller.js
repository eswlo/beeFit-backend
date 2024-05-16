const User = require('../models/user.model.js');


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

const createNewUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const userIdForUpdate = await User.findByIdAndUpdate(id, req.body); //use whatever provided in req.body to update the user by id
        
        if(!userIdForUpdate) {
            return res.status(404).json({message: "User not found"});
        }
        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({message: error.message});
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
    createNewUser,
    updateUserById,
    deleteUserById
}

