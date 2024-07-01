const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const authenticateJWT = require('../middlewares/auth');

router.post('/add-post', authenticateJWT, postsController.addPost);
router.get('/getposts',  postsController.getPosts);
router.get('/getpost/:id',  postsController.getPostById);
router.get('/tags',  postsController.getTags);

module.exports = router;
