const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")
const redis = require("../config/redis.config")
const { sendEmail } = require("../service/mail.service")

require("dotenv").config();

exports.signup = async (req, res) => {
    try {
        let { name, email, password, role } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const token = crypto.randomBytes(32).toString("hex");

        const verificationLink =
            `${process.env.CLIENT_URI}/verify-email/${token}`;

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            isverified: false
        });

        await redis.set(
            `verify:${token}`,
            user._id.toString(),
            { EX: 300 }
        )

        console.log("sended");
        await sendEmail({
            to: user.email,
            subject: "Verify Your Email",
            html: `
    <h2>Welcome to NextHire</h2>

    <p>Click the button below to verify your email.</p>

    <a href="${verificationLink}">
      Verify Email
    </a>

    <p>This link expires in 5 minutes.</p>
  `
        });

        res.status(201).json({
            message: "registered, Please verify your email",
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        if (!user.isverified) {
            return res.status(401).json({
                success: false,
                message: "Please verify your email first",
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,     // JS cannot access cookie
            secure: true,      // true in production (HTTPS)
            sameSite: "none", // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.json({
            message: "Login successful",
            token,
            user
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.logout = async (req, res) => {
    res.clearCookie("token");
    res.json({ message: "logout successfully" });
};

exports.verifyEmail = async (req, res) => {

    const { token } = req.params;

    const userId =
        await redis.get(`verify:${token}`);

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "Link Expired",
        });
    }
    
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    user.isverified = true;
    await user.save();

    await redis.del(`verify:${token}`);

    return res.status(200).json({
        success: true,
        message: "Email Verified",
    });
};

