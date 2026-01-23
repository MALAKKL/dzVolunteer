const express = require("express");
const router = express.Router();
const { importSDGs, getMissionsBySDG } = require("../controllers/sdgController");
const { authenticate, authorize } = require("../middleware/authMiddleware");

// ========================
// Admin-only route to import SDGs from XML
// ========================
router.post("/import", authenticate, authorize("ADMIN"), importSDGs);

// ========================
// Public route to get missions by SDG
// Example: GET /api/sdgs/missions?sdgId=1
// ========================
router.get("/missions", getMissionsBySDG);

module.exports = router;
