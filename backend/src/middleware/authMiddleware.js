const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");

const protect = async (req, res, next) => {
  try {
    let token = null;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "Not authorized, token missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const employee = await Employee.findById(decoded.id).select("-password");

    if (!employee) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.employee = employee;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Not authorized, invalid token",
      error: error.message,
    });
  }
};

const adminOnly = (req, res, next) => {
  if (!req.employee) {
    return res.status(401).json({
      message: "Not authorized, employee data missing",
    });
  }

  if (req.employee.role !== "admin") {
    return res.status(403).json({
      message: "Access denied. Admin only",
    });
  }

  next();
};

module.exports = { protect, adminOnly };