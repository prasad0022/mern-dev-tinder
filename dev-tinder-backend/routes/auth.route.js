const express = require('express');
const User = require('../models/user.model');
const validator = require('validator');
const bcrypt = require('bcrypt');

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    try {
        const userData = req.body;

        // Check if body is empty
        if (!userData || Object.keys(userData).length === 0) {
            return res.status(400).json({ success: false, message: "Request body is empty" });
        }

        const { firstName, lastName, emailId, password } = userData;

        if (firstName && lastName && emailId && password) {

            // Hash the password
            let hashPassword;
            if (validator.isStrongPassword(password)) {
                hashPassword = await bcrypt.hash(password, 10)
            } else {
                return res.status(400).json({ success: false, message: "Please provide a strong password" });
            }

            // Add user to DB (you can customize the User schema as needed)
            const newUser = new User({
                firstName,
                lastName,
                emailId,
                password: hashPassword,
            });
            await newUser.save();

            return res.status(201).json({ success: true, message: "Signed Up Successfully!" });

        } else {
            return res.status(400).json({ success: false, message: "Please provide all the fields" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).send(`Error while signing up: ${error.message}`);
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body || {};

        // Check if fields are provided
        if (!emailId || !password) return res.status(400).send("Please provide all the fields");

        // Find user by email
        const user = await User.findOne({ emailId });

        if (!user) return res.status(400).send("Invalid credentials");

        // Compare hashed password
        const isValidPassword = await user.validatePassword(password);

        if (!isValidPassword) return res.status(400).send("Invalid credentials");

        // If everything passes
        // Get JWT Token:
        const JWT = user.getJWT();

        res.cookie("token", JWT);
        return res.status(200).send("Login successful!");

    } catch (error) {
        console.error(error);
        res.status(500).send(`Error while logging in the user: ${error.message}`);
    }
});

authRouter.post("/logout", (req, res) => {
    try {
        res.cookie("token", null, { expires: new Date(Date.now()) });
        res.send("Logout successful!");
    } catch (error) {
        console.log(error);
        res.status(500).send("ERROR LOGGING OUT!!!");
    }
});

module.exports = authRouter;