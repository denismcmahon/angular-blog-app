const Post = require('../models/Post');
const Tag = require('../models/Tag');

const addPost = async (req, res) => {
  const { title, content, tags } = req.body;
  console.log(req.body);
  try {
    // Check if tags exist and create if they don't
    const tagIds = await Promise.all(tags.map(async tagName => {
      let tag = await Tag.findOne({ name: tagName });
      if (!tag) {
        tag = new Tag({ name: tagName });
        await tag.save();
      }
      return tag._id;
    }));

    const newPost = new Post({ title, content, tags: tagIds });
    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).send(post);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getTags = async (req, res) => {
  const searchQuery = req.query.search;
  try {
    const tags = await Tag.find({ name: new RegExp(searchQuery, 'i') }).limit(10);
    res.json(tags.map(tag => tag.name));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tags', error });
  }
}

module.exports = {
  addPost,
  getPosts,
  getPostById,
  getTags
};
