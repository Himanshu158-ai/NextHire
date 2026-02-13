const jwt = require("jsonwebtoken");
require("dotenv").config();

const seekerOnly = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Role check
    if (req.user.role === "seeker") {
      next(); // allow access
    } else {
      return res.status(403).json({ message: "Seeker access only" });
    }

  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = seekerOnly;
