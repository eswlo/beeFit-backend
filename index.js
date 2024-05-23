require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const User = require('./models/user.model.js');
const userRoute = require('./routes/user.route.js');
const port = 3000;
// const path = require("path");
const bcrypt = require('bcrypt');
const app = express();


//middleware for handling json format
app.use(express.json());
app.use(express.urlencoded({extended: false})); //for url form entry


//api http request test
app.get('/', (req, res) => {
    res.send("Node API Server is updated and working")
});


// api route
app.use('/api/users', userRoute);






mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    //step1: connect to db first 
    console.log('Connected to mongoDB!');
    //step2: run the server
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`)
    });
}).catch(() => console.log('Failed to connect to mongoDB!'));