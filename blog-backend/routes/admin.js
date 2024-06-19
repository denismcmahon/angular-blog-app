const express = require('express');
const router = express.Router();
const { getUsers, addUser } = require('../controllers/adminController');
const authenticateJWT = require('../middlewares/auth');

router.get('/users', getUsers);
router.post('/add-user', authenticateJWT, addUser);

module.exports = router;
