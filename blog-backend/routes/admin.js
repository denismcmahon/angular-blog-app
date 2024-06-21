const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticateJWT = require('../middlewares/auth');

router.get('/users', adminController.getUsers);
router.post('/add-user', authenticateJWT, adminController.addUser);
router.put('/edit-user/:id', adminController.editUser);
router.get('/user/:id', adminController.getUserById);

module.exports = router;
