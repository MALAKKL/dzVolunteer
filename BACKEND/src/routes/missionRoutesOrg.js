const express = require("express");
const router = express.Router();
const { createMission, updateMission, deleteMission } = require("../controllers/missionController");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const { getMissionApplicants, updateApplicationStatus } = require("../controllers/missionController");

// All routes require authentication + ORGANIZATION role
router.use(authenticate, authorize("ORGANIZATION"));

const upload = require("../middleware/uploadMiddleware");

// Create a mission
router.post("/", upload.single("image"), createMission);

// Update a mission
router.put("/:id", updateMission);

// Delete a mission
router.delete("/:id", deleteMission);

// Get applicants for a mission
router.get("/:id/applicants", getMissionApplicants);

// Approve/reject application
router.put("/applications/:applicationId", updateApplicationStatus);

module.exports = router;

