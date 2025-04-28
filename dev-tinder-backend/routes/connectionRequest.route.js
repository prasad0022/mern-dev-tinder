const express = require('express');
const { userAuth } = require('../middlewares/auth');
const User = require('../models/user.model');
const ConnectionRequest = require('../models/connectionRequest.model');

const connectionRequestRouter = express.Router();

connectionRequestRouter.post("/request/send/:status/:userId", userAuth, async (req, res) => {
    try {

        const fromUserId = req.user._id;
        const toUserId = req.params.userId;
        const status = req.params.status;

        // Check for valid status:
        const allowedStatus = ["interested", "ignored"];
        if (!allowedStatus.includes(status)) return res.status(400).json({ success: false, message: `${status} is not a valid status` });

        // Check for valid toUser:
        const toUser = await User.findById(toUserId);
        if (!toUser) return res.status(404).json({ success: false, message: "User not found!" });

        // Check for existing connection request:
        const existingRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });
        if (existingRequest) return res.status(400).json({ success: false, message: "Request already exists!" });

        // Send a request:
        const connectionRequestData = new ConnectionRequest({ fromUserId, toUserId, status });
        await connectionRequestData.save();

        return res.status(201).json({ success: true, message: "Request sent!" });

    } catch (error) {
        console.log(error);
        res.status(500).send("ERROR IN CONNECTION REQUEST: " + error.message);
    }
});

connectionRequestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {

        const loggedInUser = req.user;
        const { status, requestId } = req.params;

        // Check valid input status:
        const allowedStatus = ["accepted", "rejected"];
        if (!allowedStatus.includes(status)) return res.status(400).json({ success: false, message: `${status} is not a valid status!` });

        // Check valid requestId, toUser, status:
        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested"
        });
        if (!connectionRequest) return res.status(404).json({ success: false, message: `Connection request not found!` });

        // If valid data:
        connectionRequest.status = status;
        await connectionRequest.save();

        return res.status(200).json({ success: true, message: `Request ${status} successfully!` });

    } catch (error) {
        console.log(error);
        res.status(500).send("ERROR IN REVIEW REQUEST: " + error.message);
    }
});

module.exports = connectionRequestRouter;