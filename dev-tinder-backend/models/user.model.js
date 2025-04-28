const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 15
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 15
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error("Invalid email address");
        }
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "other"].includes(value.toLowerCase())) throw new Error("Invalid gender!");
        }
    },
    photoURL: {
        type: String,
        default: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png",
        validate(value) {
            if (!validator.isURL(value)) throw new Error("Invalid photo URL");
        }
    },
    about: {
        type: String,
    },
    skills: {
        type: [String],
        validate(value) {
            if (value.length > 10) throw new Error("Maximum 10 skills are allowed");
        }
    }
}, { timestamps: true });

userSchema.methods.getJWT = function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, "DEV@tinder0022", { expiresIn: "1d" });
    return token;
};

userSchema.methods.validatePassword = async function (inputPassword) {
    const user = this;
    const isValide = await bcrypt.compare(inputPassword, user.password);
    return isValide;
}

const User = mongoose.model("User", userSchema);

module.exports = User;