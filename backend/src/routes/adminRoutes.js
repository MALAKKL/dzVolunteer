const express = require("express");
const { verifySkill, deleteUser } = require("../controllers/admin.controller");
const { authenticate, authorize } = require("../middleware/auth.middleware");

const router = express.Router();

// All admin routes require authentication + ADMIN role
router.use(authenticate, authorize("ADMIN"));

// Verify volunteer skill
router.put("/skills/verify", verifySkill);

// Delete spam user (volunteer or organization)
router.delete("/users/:userId", deleteUser);

module.exports = router;
