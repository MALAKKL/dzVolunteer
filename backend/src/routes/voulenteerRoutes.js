// src/routes/volunteerRoutes.js
const express = require("express");
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getVolunteers,getMyProfile, updateMyProfile, deleteMyAccount } = require("../controllers/volunteerController");

// GET /volunteers
router.get("/", getVolunteers);

//protected routes for volunteer profile management
router.get('/me', auth, getMyProfile);
router.patch('/me', auth, updateMyProfile);
router.delete('/me', auth, deleteMyAccount);

module.exports = router;
