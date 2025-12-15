const express = require("express");
const router = express.Router();
const { getAllMissions, getMission } = require("../controllers/missionController");

// Public routes
router.get("/", getAllMissions);
router.get("/:id", getMission);

module.exports = router;
