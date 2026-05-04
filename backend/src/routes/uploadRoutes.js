const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Correct order
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("file"),
  (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No file uploaded",
        });
      }

      return res.status(200).json({
        message: "File uploaded successfully",
        file: {
          filename: req.file.filename,
          originalname: req.file.originalname,
          mimetype: req.file.mimetype,
          size: req.file.size,
          path: `/uploads/${req.file.filename}`,
        },
      });
    } catch (error) {
      console.error("Upload Error:", error);

      return res.status(500).json({
        message: "Server error during file upload",
      });
    }
  }
);

module.exports = router;