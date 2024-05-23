const express = require('express');
const Post = require('../models/Post');

const router = express.Router();

// create a new post
router.post('/add-post', async (req, res) => {
  const { title, content } = req.body;

  try {
    const newPost = new Post({ title, content });
    await newPost.save();
    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// get all posts
router.get('/getposts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
