const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const { getMyProfile, updateMyProfile, deleteMyAccount } = require('../controllers/volunteer.controller');

router.get('/me', auth, getMyProfile);
router.patch('/me', auth, updateMyProfile);
router.delete('/me', auth, deleteMyAccount);

module.exports = router;
