// src/routes/volunteerRoutes.js
const express = require("express");
const router = express.Router();
const { getVolunteers } = require("../controllers/volunteerController");

// GET /volunteers
router.get("/", getVolunteers);

module.exports = router;
