const express = require("express");
const router = express.Router();
const { getAllSkills, createSkill } = require("../controllers/skillController");
const { authenticate, authorize } = require("../middleware/authMiddleware");

// Public: Get all skills
router.get("/", getAllSkills);

// Admin only: Create new skill
router.post("/", authenticate, authorize("ADMIN"), createSkill);

module.exports = router;
