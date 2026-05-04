const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const Document = require("../models/Document");


// ✅ 1. Upload Document
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("file"),
  async (req, res) => {
    try {
      const { title, category } = req.body;

      // Validate fields
      if (!title || !category) {
        return res.status(400).json({
          message: "Title and category are required",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          message: "No file uploaded",
        });
      }

      // Save to DB
      const newDoc = await Document.create({
        title,
        category,
        filePath: `uploads/${req.file.filename}`,
      });

      res.status(201).json({
        message: "Document uploaded successfully",
        document: newDoc,
      });

    } catch (error) {
      console.error("Upload Error:", error);

      res.status(500).json({
        message: "Server error during upload",
      });
    }
  }
);


// ✅ 2. Get All Documents
router.get("/", async (req, res) => {
  try {
    const documents = await Document.find().sort({ createdAt: -1 });

    res.status(200).json(documents);

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});


// ✅ 3. Delete Document
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);

    if (!doc) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    await doc.deleteOne();

    res.status(200).json({
      message: "Document deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});


// ✅ 4. Get Single Document (Optional but professional)
router.get("/:id", async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);

    if (!doc) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    res.status(200).json(doc);

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});


module.exports = router;