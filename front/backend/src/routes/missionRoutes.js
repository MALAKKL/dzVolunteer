const express = require("express");
const { archiveMission, searchMissions } = require("../controllers/missionController");
const { authenticate } = require("../middleware/authMiddleware");
const router = express.Router();
// volunteer routes
router.use(authenticate);

router.put("/archive/:id", archiveMission);
router.get("/search", searchMissions);

module.exports = router;
