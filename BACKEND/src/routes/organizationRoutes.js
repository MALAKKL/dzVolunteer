const express = require("express");
const {
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
} = require("../controllers/organizatonController");
const uploadOrgPhoto = require("../middleware/uploadMiddleware");
const { uploadOrgProfilePhoto } = require("../controllers//organizatonController");

const { authenticate, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

//uploadphoto for org
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

module.exports = router;
