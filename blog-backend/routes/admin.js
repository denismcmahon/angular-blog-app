const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticateJWT = require('../middlewares/auth');

router.get('/users', adminController.getUsers);
router.post('/add-user', authenticateJWT, adminController.addUser);

module.exports = router;
