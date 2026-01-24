const express = require('express');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { applyToMission, getMyApplications, getMyParticipations } = require('../controllers/applicationController');
const router = express.Router();

router.post('/missions/:missionId/apply', authenticate, authorize('VOLUNTEER'), applyToMission);
router.get('/my-applications', authenticate, authorize('VOLUNTEER'), getMyApplications);
router.get('/my-participations', authenticate, authorize('VOLUNTEER'), getMyParticipations);

module.exports = router;
