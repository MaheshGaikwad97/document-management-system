const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/dashboard", protect, adminOnly, (req, res) => {
  res.status(200).json({
    message: "Welcome Admin",
    employee: req.employee,
  });
});

module.exports = router;