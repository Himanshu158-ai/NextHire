const express = require("express");
const router = express.Router();
const { signup,login,logout } = require("../controllers/authcontrolls");
const {emailLimiter} = require("../middlewares/RateLimiter.js");

router.post("/signup", emailLimiter,signup);
router.post("/login",login);
router.get("/logout",logout);
// router.get("/verify-email/:token", verifyEmail);


module.exports = router;
