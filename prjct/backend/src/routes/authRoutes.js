const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  registerVolunteer,
  registerOrganization,
  login,
  googleAuth,
  forgotPassword,
  resetPassword,
  getProfile
} = require("../controllers/authController");

const { authenticate } = require("../middleware/authMiddleware");

// Public routes
router.post("/register/volunteer", registerVolunteer);
router.post("/register/organization", registerOrganization);
router.post("/login", login);
router.post("/google", googleAuth);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Protected routes
router.get("/profile", authenticate, getProfile);

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    res.json({
      message: "Google login successful",
      user: req.user,
    });
  }
);

module.exports = router;
