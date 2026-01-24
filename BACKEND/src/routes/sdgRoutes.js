const express = require("express");
const router = express.Router();
const { importSDGs, getMissionsBySDG, getAllSDGs } = require("../controllers/sdgController");
const { authenticate, authorize } = require("../middleware/authMiddleware");

// ========================
// Public Route: Get All SDGs
// ========================
router.get("/", getAllSDGs);

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
