const express = require('express');
const User = require('../models/User');
const router = express.Router();
const crypto = require('crypto');
const { sendPasswordSetupEmail } = require('../services/emailService');

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, 'id username role'); // fetch only id, username and role fields from the db
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
})

router.post('/add-user', async (req, res) => {
  try {
    const { email, role } = req.body;
    // generate a token for password setup
    const token = crypto.randomBytes(16).toString('hex');

    // check if the user already exists
    let user = await User.findOne({ email });
    if(user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // create a new user
    user = new User({ email, role, token });
    await user.save();

    // send email for passowrd setup
    await sendPasswordSetupEmail(email.token);

    res.status(201).json({ message: 'User added and email sent' });
  }
  catch (error) {
    res.status(500).json({ message: 'Error adding user', error });
  }
})

module.exports = router;
