const express = require("express");
const User = require("../models/user.model.js")
const router = express.Router();
const {getUsers, getOneUserById, signUp, loginUser,updateUserById, deleteUserById} = require("../controllers/user.controller.js");

router.get('/', getUsers);
router.get('/:id', getOneUserById);
router.post('/', signUp);
router.post('/login', loginUser);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);

module.exports = router;
