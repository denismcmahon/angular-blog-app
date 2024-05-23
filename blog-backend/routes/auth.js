const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

router.post('/login', async (req, res) => {
  console.log('DM login endpoint called');
  const { username, password } = req.body;
  console.log('username and password', username, password);
  try {
    const user = await User.findOne({ username });
    console.log('user: ', user);
    if (!user) {
      return res.status(401).send('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('isMatch: ', isMatch);
    if (!isMatch) {
      return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
    console.log('DM ==> token: ', token);
    res.json({ token });
  } catch (error) {
    res.status(500).send('An error occurred');
  }
});

module.exports = router;
