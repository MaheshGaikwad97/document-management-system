const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const Document = require("../models/Document");
const { protect, adminOnly } = require("../middleware/authMiddleware");


// =======================
// CREATE UPLOAD FOLDER SAFE
// =======================
const fs = require("fs");

const uploadPath = "uploads/documents";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}


// =======================
// MULTER CONFIG
// =======================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, uniqueName);
  },
});

// safer file filter
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/pdf" ||
    file.originalname.endsWith(".pdf")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});


// =======================
// UPLOAD ROUTE
// =======================

router.post(
  "/",
  upload.single("file"),
  protect,
  
  async (req, res) => {
    try {
      console.log("BODY:", req.body);
      console.log("FILE:", req.file);

      const title = req.body?.title;
      const category = req.body?.category;

      if (!title || !category) {
        return res.status(400).json({
          message: "Title and category are required",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          message: "No file uploaded or invalid file type",
        });
      }

      const newDoc = await Document.create({
        title,
        category,
        filePath: req.file.path,
        fileName: req.file.filename,
      });

      return res.status(201).json({
        message: "Document uploaded successfully",
        data: newDoc,
      });

    } catch (error) {
      console.error("Upload Error:", error);

      return res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  }
);


// =======================
// GET ALL DOCUMENTS
// =======================

router.get("/", async (req, res) => {
  try {
    const docs = await Document.find().sort({ createdAt: -1 });

    res.status(200).json(docs);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching documents",
      error: error.message,
    });
  }
});


// =======================
// DELETE DOCUMENT
// =======================

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
      message: "Error deleting document",
      error: error.message,
    });
  }
});


// EXPORT
module.exports = router;