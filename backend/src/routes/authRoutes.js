// src/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { registerVolunteer, registerOrganization, login } = require("../controllers/authController");

// Volunteer routes
router.post("/volunteer/register", registerVolunteer);
router.post("/volunteer/login", (req, res) => {
  req.body.role = "volunteer"; // force role
  login(req, res);
});

// Organization routes
router.post("/organization/register", registerOrganization);
router.post("/organization/login", (req, res) => {
  req.body.role = "organization"; // force role
  login(req, res);
});

router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

module.exports = router;
