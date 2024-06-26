const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");


// define the schema stringIntPairSchema for rewards value type
const stringIntPairSchema = new mongoose.Schema({
    description: String,
    count: Number    
});


const UserSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "Please enter your first name"]
        },
        lastName: {
            type: String,
            required: [true, "Please enter your last name"]
        },
        phoneNumber: {
            type: String,
            required: [true, "Please enter your phone number"]
        },
        email: {
            type: String,
            required: [true, "Please enter your email"]        
        },
        userName: {
            type: String,
            required: [true, "Please enter a user name"]        
        },
        password: {
            type: String,
            required: [true, "Please enter a password"]
        },
        earnedPoints: {
            type: Number,
            required: false,
            default: 0
        },
        rewards: {
            type: Map, // Key type default is string
            of: stringIntPairSchema, // Define the value type of the map
            default: new Map() // Initialize an empty map
        }
    },
    {
        timestamps: true
    }
);


// Middleware to capitalize and convert to lowercase the first letter of each word in firstName and lastName before saving
UserSchema.pre('save', function(next) {
    this.firstName = this.firstName.toLowerCase();
    this.lastName = this.lastName.toLowerCase();
    next();
});

// Helper function to capitalize the first letter of each word and convert the rest to lowercase
function capitalizeEachWord(str) {
    return str.replace(/\b\w/g, function(char) {
        return char.toUpperCase();
    }).toLowerCase();
}

const User = mongoose.model("User", UserSchema);
module.exports = User;