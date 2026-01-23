const express = require('express');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { applyToMission } = require('../controllers/applicationController');
const router = express.Router();

router.post('/missions/:missionId/apply', authenticate, authorize('VOLUNTEER'), applyToMission);


module.exports = router;
