const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/assign-role', async (req, res) => {
  const { username, role } = req.body;

  // validate the role
  if (!['user', 'admin', 'superAdmin'].includes(role)) {
    return res.status(400).send('Invalid role');
  }

  try {
    // find the user by username
    const user = await User.findOne({ username });

    // check if user exists
    if (!user) {
      return res.status(404).send('User not found');
    }

    // update the user's role
    user.role = role;
    await user.save();

    // respond with success message
    res.send('Role updated');
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).send('An error occurred');
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, 'id username role'); // fetch only id, username and role fields from the db
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
})

module.exports = router;
