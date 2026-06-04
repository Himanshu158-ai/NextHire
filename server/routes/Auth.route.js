const express = require("express");
const router = express.Router();
const { signup,login,logout,verifyEmail } = require("../controllers/authcontrolls");
const protect = require("../middlewares/Auth.middleware");
const {emailLimiter} = require("../middlewares/RateLimiter.js");

router.post("/signup", emailLimiter,signup);
router.post("/login",login);
router.get("/logout",logout);
router.get("/verify-email/:token", verifyEmail);


module.exports = router;
