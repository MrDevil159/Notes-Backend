const express = require("express");
const router = express.Router();
const {register, login, verifyToken} = require("../controller/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/verify", verifyToken);

module.exports = router;
