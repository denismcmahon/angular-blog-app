const express = require('express');
const router = express.Router();
const { addPost, getPosts } = require('../controllers/postsController');
const authenticateJWT = require('../middlewares/auth');

router.post('/add-post', authenticateJWT, addPost);
router.get('/getposts',  getPosts);

module.exports = router;
