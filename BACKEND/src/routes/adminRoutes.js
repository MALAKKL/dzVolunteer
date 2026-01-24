const express = require("express");
const router = express.Router();
const {
    verifySkill,
    deleteUser,
    getAllVolunteers,
    getAllOrganizations,
    getPendingSkills,
    getAllUsers
} = require("../controllers/adminController");
const { authenticate, authorize } = require("../middleware/authMiddleware");

// All admin routes require authentication + ADMIN role
router.use(authenticate, authorize("ADMIN"));

// User management
router.get("/volunteers", getAllVolunteers);
router.get("/organizations", getAllOrganizations);
router.get("/users", getAllUsers);
router.delete("/users/:userId", deleteUser);

// Skill verification
router.get("/skills/pending", getPendingSkills);
router.put("/skills/:id/verify", verifySkill);

module.exports = router;
