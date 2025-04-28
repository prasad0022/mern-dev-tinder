const express = require('express');
const { userAuth } = require('../middlewares/auth');
const User = require('../models/user.model');
const validator = require('validator');
const bcrypt = require('bcrypt');

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.status(200).send(user);

    } catch (error) {
        console.log(error);
        res.status(500).send("ERROR FETCHING PROFILE: " + error.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        const user = req.user;
        const data = req?.body;

        if (!data) throw new Error("Please provide fields to be updated!");
        if (data.emailId || data.password) throw new Error("Email cannot be updated. For Password change please try other method.");
        const updatedUser = await User.findByIdAndUpdate(user._id, data, { new: true, runValidators: true });
        updatedUser ? res.status(200).json({ success: true, data: updatedUser }) : res.status(404).json({ success: false, message: "User not found!" });

    } catch (error) {
        console.error(error);
        res.status(400).send(`Error while updating the uesr: ${error.message}`);
    }
});

profileRouter.delete("/profile/delete", userAuth, async (req, res) => {
    try {
        const user = req.user;
        const isDeleted = await User.findByIdAndDelete(user._id);
        isDeleted ? res.status(200).json({ success: true, message: "User deleted successfully!" }) : res.status(400).json({ success: false, message: "User not found!" });
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error while deleting the uesr: ${error.message}`);
    }
});

profileRouter.patch("/profile/password-change", userAuth, async (req, res) => {
    try {
        const user = req.user;
        const { oldPassword, newPassword, confirmPassword } = req.body || {};
        if (!oldPassword || !newPassword || !confirmPassword) return res.status(400).json({ success: false, message: "Please provide required fields" });

        const isValidPassword = await user.validatePassword(oldPassword);
        if (!isValidPassword) return res.status(400).json({ success: false, message: "Old password is incorrect" });

        if (!validator.isStrongPassword(newPassword)) return res.status(400).json({ success: false, message: "Please provide a strong password" });

        if (newPassword !== confirmPassword) return res.status(400).json({ success: false, message: "Passwords do not match. Please try again" });

        const hashPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashPassword;
        await user.save();

        return res.status(200).json({ success: true, message: "Password updated successfully!" });

    } catch (error) {
        console.log(error);
        return res.status(500).send("PASSWORD CHANGE ERROR: " + error.message);
    }
});

module.exports = profileRouter;