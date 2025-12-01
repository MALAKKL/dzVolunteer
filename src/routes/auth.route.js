const express = require('express');
const router = express.Router();
const { volunteerRegister, volunteerLogin } = require('../controllers/auth.controller');

router.post('/volunteer/register', volunteerRegister);
router.post('/volunteer/login', volunteerLogin);

module.exports = router;
