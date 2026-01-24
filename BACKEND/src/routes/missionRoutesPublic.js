const express = require("express");
const router = express.Router();
const { getAllMissions, getMission, searchMissions } = require("../controllers/missionController");

// Public routes
router.get("/", getAllMissions);
router.get("/search", searchMissions);
router.get("/:id", getMission);

module.exports = router;
