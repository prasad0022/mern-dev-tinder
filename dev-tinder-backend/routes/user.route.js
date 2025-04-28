const express = require('express');
const { userAuth } = require('../middlewares/auth');
const User = require('../models/user.model');
const ConnectionRequest = require('../models/connectionRequest.model');

const userRouter = express.Router();

const USER_SAFE_DATA = ["firstName", "lastName", "about", "photoURL", "gender", "skills"];

userRouter.get("/user/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 20 ? 20 : limit;
        const skip = (page - 1) * limit;

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        }).select(["fromUserId", "toUserId"]);

        const hideFeedsOf = new Set();

        connectionRequests.forEach(req => {
            hideFeedsOf.add(req.fromUserId.toString());
            hideFeedsOf.add(req.toUserId.toString());
        });

        const feeds = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideFeedsOf) } },
                { _id: { $ne: loggedInUser._id } }
            ]
        })
            .select(USER_SAFE_DATA)
            .skip(skip)
            .limit(limit);

        return res.status(200).send({ success: true, count: feeds.length, data: feeds });

    } catch (error) {
        console.error(error);
        res.status(500).send(`Error while fetching the feeds: ${error.message}`);
    }
});

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {

        const loggedInUser = req.user;

        const pendingRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", USER_SAFE_DATA);

        if (pendingRequests.length == 0) return res.status(404).json({ success: false, message: "Connection requests not found!" });

        return res.status(200).json({ success: true, data: pendingRequests });

    } catch (error) {
        console.error(error);
        res.status(500).send(`ERROR WHILE FETCHING PENDING REQUESTS: ${error.message}`);
    }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {

        const loggedInUser = req.user;

        // Check fromUserId, toUserId & status:
        const connections = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id, status: "accepted" },
                { toUserId: loggedInUser._id, status: "accepted" }
            ]
        })
            .populate("fromUserId", USER_SAFE_DATA)
            .populate("toUserId", USER_SAFE_DATA)

        if (connections.length == 0) return res.status(404).json({ success: false, message: "Connections not found!" });

        const data = connections.map((conn) => {
            if (conn.fromUserId._id.toString() === loggedInUser._id.toString()) return conn.toUserId;
            return conn.fromUserId;
        })

        return res.status(200).json({ success: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).send(`ERROR WHILE FETCHING CONNECTIONS: ${error.message}`);
    }
})

module.exports = userRouter;