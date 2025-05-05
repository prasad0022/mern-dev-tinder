const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { _id } = decoded;
        const user = await User.findById(_id);

        if (!user) throw new Error("User not found!");

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send("AUTH ERROR: " + error.message);
    }
}

module.exports = { userAuth };