const express = require("express");
const router = express.Router();

const {
  createMission,
  getAllMissions,
  getMission,
  updateMission,
  deleteMission,
} = require("../controllers/missionController");

const { protect } = require("../middleware/authMiddleware");
const { isOrganization } = require("../middleware/roleMiddleware");

// Public
router.get("/", getAllMissions);
router.get("/:id", getMission);

// Organization-only
router.post("/", protect, isOrganization, createMission);
router.put("/:id", protect, isOrganization, updateMission);
router.delete("/:id", protect, isOrganization, deleteMission);

module.exports = router;
