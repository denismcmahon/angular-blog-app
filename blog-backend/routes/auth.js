const express = require('express');
const router = express.Router();
const { login, setPassword } = require('../controllers/authController');

router.post('/login', login);
router.post('/set-password', setPassword);

module.exports = router;
