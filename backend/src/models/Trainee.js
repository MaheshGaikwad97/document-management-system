const mongoose = require("mongoose");

const traineeSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      default: "",
    },

    designation: {
      type: String,
      trim: true,
      default: "",
    },

    division: {
      type: String,
      required: true,
      trim: true,
    },

    officeName: {
      type: String,
      trim: true,
      default: "",
    },

    jobLocation: {
      type: String,
      trim: true,
      default: "",
    },

    batch: {
      type: String,
      required: true,
      trim: true,
    },

    course: {
      type: String,
      required: true,
      trim: true,
    },

    joiningDate: {
      type: Date,
      default: Date.now,
    },

    address: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["active", "completed", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Trainee", traineeSchema);