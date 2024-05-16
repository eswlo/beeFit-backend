const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

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
        email: {
            type: String,
            required: [true, "Please enter your email"],
            unique: [true, "This email address is already in use"]
        },
        userName: {
            type: String,
            required: [true, "Please enter a user name"],
            unique: [true, "this user name is already taken"]
        },
        phoneNumber: {
            type: String,
            required: [true, "Please enter your phone number"]
        },
        password: {
            type: String,
            required: [true, "Please enter a password"]
        },
        earnedPoints: {
            type: Number,
            required: false,
            default: 0
        }
    },
    {
        Timestamps: true
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