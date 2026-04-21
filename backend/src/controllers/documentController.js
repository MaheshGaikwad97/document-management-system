const Document = require("../models/Document");

// Upload document + save to DB
const uploadDocument = async (req, res) => {
  try {
    // Check file
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const { title, category } = req.body;

    // Validate fields
    if (!title || !category) {
      return res.status(400).json({
        message: "Title and category are required",
      });
    }

    // Save document
    const newDoc = await Document.create({
      title,
      category,
      filePath: `/uploads/${req.file.filename}`,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      uploadedBy: req.user.id,
    });

    res.status(201).json({
      message: "Document uploaded successfully",
      document: newDoc,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error uploading document",
      error: error.message,
    });
  }
};

// Get all documents
const getAllDocuments = async (req, res) => {
  try {
    const docs = await Document.find().populate("uploadedBy", "name email");

    res.json(docs);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching documents",
      error: error.message,
    });
  }
};

// Get documents by category
const getDocumentsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const docs = await Document.find({ category });

    res.json(docs);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching documents",
      error: error.message,
    });
  }
};

module.exports = {
  uploadDocument,
  getAllDocuments,
  getDocumentsByCategory,
};