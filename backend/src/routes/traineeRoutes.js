const express = require("express");
const router = express.Router();

const {
  addTrainee,
  getAllTrainees,
  getSingleTrainee,
  updateTrainee,
  deleteTrainee,
} = require("../controllers/traineeController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Add trainee - admin only
router.post("/", protect, adminOnly, addTrainee);

// Get all trainees - logged in employee
router.get("/", protect, getAllTrainees);

// Get single trainee - logged in employee
router.get("/:id", protect, getSingleTrainee);

// Update trainee - admin only
router.put("/:id", protect, adminOnly, updateTrainee);

// Delete trainee - admin only
router.delete("/:id", protect, adminOnly, deleteTrainee);

module.exports = router;