const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const { applyToMission } = require('../controllers/application.controller');

router.post('/missions/:missionId/apply', auth, applyToMission);

module.exports = router;
