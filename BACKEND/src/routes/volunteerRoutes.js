const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const {
    getVolunteers,
    getMyProfile,
    updateMyProfile,
    deleteMyAccount,
    uploadVolunteerPhoto,
    getTopVolunteers,
    addSkillWithCertificate
} = require("../controllers/volunteerController");
const upload = require('../middleware/uploadMiddleware');

// Public routes
router.get("/", getVolunteers);
router.get("/top", getTopVolunteers);

// Protected routes for volunteer profile management
router.get('/me', authenticate, authorize('VOLUNTEER'), getMyProfile);
router.patch('/me', authenticate, authorize('VOLUNTEER'), updateMyProfile);
router.delete('/me', authenticate, authorize('VOLUNTEER'), deleteMyAccount);

// Upload photo
router.put('/profile/photo', authenticate, authorize('VOLUNTEER'), upload.single('photo'), uploadVolunteerPhoto);

// Add skill with certificate
router.post('/skills', authenticate, authorize('VOLUNTEER'), upload.single('certificate'), addSkillWithCertificate);

module.exports = router;
