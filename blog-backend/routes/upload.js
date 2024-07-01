const express = require('express');
const router = express.Router();

const uploadController = require('../controllers/uploadController');
const upload = require('../middlewares/upload');

router.post('/upload-image', upload.single('image'), uploadController.uploadImage);

module.exports = router;
