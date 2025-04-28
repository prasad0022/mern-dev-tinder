const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.route');
const profileRouter = require('./routes/profile.route');
const userRouter = require('./routes/user.route');
const connectionRequestRouter = require('./routes/connectionRequest.route');
const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());



app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", userRouter);
app.use("/", connectionRequestRouter);

app.listen(5000, async () => {
    try {
        await connectDB();
        console.log("Server running on port 5000");
    } catch (error) {
        console.error(error.message);
    }

});