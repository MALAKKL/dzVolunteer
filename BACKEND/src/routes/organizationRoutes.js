const express = require("express");
const {
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  validateParticipation,
  uploadOrgProfilePhoto
} = require("../controllers/organizatonController");
const uploadOrgPhoto = require("../middleware/uploadMiddleware");

const { authenticate, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Upload photo for org
router.put(
  "/profile/photo",
  authenticate,
  authorize("ORGANIZATION"),
  uploadOrgPhoto.single("photo"),
  uploadOrgProfilePhoto
);

// Public: view organizations
router.get("/", getAllOrganizations);
router.get("/:id", getOrganizationById);

// Protected: update own organization
router.put("/:id", authenticate, authorize("ORGANIZATION"), updateOrganization);

// Validate hours
router.post("/validate-participation", authenticate, authorize("ORGANIZATION"), validateParticipation);

module.exports = router;
