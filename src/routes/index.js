const express = require("express");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const authRoutes = require("./authRoutes");
const noteRoutes = require("./noteRoutes");
require("../middleware/passport");

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", passport.authenticate("jwt", {session: false}), noteRoutes);

// Connect to DB
mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}).catch((error) => console.error("Failed to connect to MongoDB:", error));
