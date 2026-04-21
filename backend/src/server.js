const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const adminRoutes = require("./routes/adminRoutes");
const traineeRoutes = require("./routes/traineeRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const documentRoutes = require("./routes/documentRoutes");

dotenv.config();

const app = express();

// =====================
// MIDDLEWARE
// =====================
app.use(cors());

// FIX: required for form-data + urlencoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static files
app.use("/uploads", express.static("uploads"));

// =====================
// ROUTES
// =====================
app.use("/api/auth", authRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/trainees", traineeRoutes);
app.use("/api/upload", uploadRoutes);

// =====================
// TEST ROUTE
// =====================
app.post("/api/test", (req, res) => {

  // 👇 ADD THIS LINE
  console.log("TEST BODY:", req.body);

  res.json({
    message: "POST working ✅",
    body: req.body,
  });
});

// home route
app.get("/", (req, res) => {
  res.send("Backend running ✅");
});

// =====================
// DB + SERVER START
// =====================
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT} ✅`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Error ❌", err.message);
  });