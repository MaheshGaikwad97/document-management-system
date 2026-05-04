const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post(
  "/",
  protect,
  adminOnly,
  upload.single("file"),
  (req, res) => {
    try {
      console.log("BODY:", req.body); // DEBUG
      console.log("FILE:", req.file); // DEBUG

      const { title, category } = req.body;

      // ✅ Check title & category
      if (!title || !category) {
        return res.status(400).json({
          message: "Title and category are required",
        });
      }

      // ✅ Check file
      if (!req.file) {
        return res.status(400).json({
          message: "No file uploaded",
        });
      }

      return res.status(200).json({
        message: "File uploaded successfully",
        data: {
          title,
          category,
          filename: req.file.filename,
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