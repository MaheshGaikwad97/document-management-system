const Trainee = require("../models/Trainee");

// Add trainee
const addTrainee = async (req, res) => {
  try {
    const {
      fullName,
      mobile,
      email,
      designation,
      division,
      officeName,
      jobLocation,
      batch,
      course,
      joiningDate,
      address,
      status,
    } = req.body;

    if (!fullName || !mobile || !division || !batch || !course) {
      return res.status(400).json({
        message: "fullName, mobile, division, batch, and course are required",
      });
    }

    const trainee = await Trainee.create({
      fullName,
      mobile,
      email,
      designation,
      division,
      officeName,
      jobLocation,
      batch,
      course,
      joiningDate,
      address,
      status,
    });

    res.status(201).json({
      message: "Trainee added successfully",
      trainee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all trainees
const getAllTrainees = async (req, res) => {
  try {
    const trainees = await Trainee.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Trainees fetched successfully",
      count: trainees.length,
      trainees,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get single trainee by ID
const getSingleTrainee = async (req, res) => {
  try {
    const trainee = await Trainee.findById(req.params.id);

    if (!trainee) {
      return res.status(404).json({
        message: "Trainee not found",
      });
    }

    res.status(200).json({
      message: "Trainee fetched successfully",
      trainee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};



// Update trainee
const updateTrainee = async (req, res) => {
  try {
    const trainee = await Trainee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!trainee) {
      return res.status(404).json({
        message: "Trainee not found",
      });
    }

    res.status(200).json({
      message: "Trainee updated successfully",
      trainee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Delete trainee
const deleteTrainee = async (req, res) => {
  try {
    const trainee = await Trainee.findByIdAndDelete(req.params.id);

    if (!trainee) {
      return res.status(404).json({
        message: "Trainee not found",
      });
    }

    res.status(200).json({
      message: "Trainee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  addTrainee,
  getAllTrainees,
  getSingleTrainee,
  updateTrainee,
  deleteTrainee,
};