const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if(!user || user.password ! == password) {
    return res.status(401)send('Invalid credentials');
  }
  const token = jwt.sign({ id: user._id, role: user.role }, 'messi_is_the_goat');
  res.json({ token });
});

module.exports = router;
