const jwt = require("jsonwebtoken");

// 🔐 Protect Middleware (Check Token)
const protect = (req, res, next) => {
  let token;

  console.log("AUTH HEADER:", req.headers.authorization); // DEBUG

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("DECODED USER:", decoded); // DEBUG

      // Attach user data to request
      req.user = decoded;

      next();
    } catch (error) {
      console.log("JWT ERROR:", error.message);

      return res.status(401).json({
        message: "Not authorized",
        error: error.message,
      });
    }
  } else {
    return res.status(401).json({
      message: "No token provided",
    });
  }
};

// 🔒 Admin Only Middleware
const adminOnly = (req, res, next) => {
  console.log("USER IN ADMIN CHECK:", req.user); // DEBUG

  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      message: "Admin access only",
    });
  }
};

module.exports = { protect, adminOnly };