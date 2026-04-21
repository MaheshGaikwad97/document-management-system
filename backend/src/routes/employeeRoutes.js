const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    message: "Protected profile accessed successfully",
    employee: req.employee,
  });
});

module.exports = router;