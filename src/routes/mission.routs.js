const express = require('express');
const router = express.Router();
const { archiveMission, searchMissions } = require('../controllers/mission.controller');

// public list & search

router.get('/search', searchMissions);

// create/update/publish/archive (for now public - add org auth later)

router.post('/:id/archive', archiveMission);

module.exports = router;
