const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/assign-role', async (req, res) => {
  const { username, role } = req.body;
  if(!['user', 'admin', 'superAdmin']).includes(role)) {
    return res.status(400).send('Invalid role');
  }
  const user = await = User.findOne({ username });
  if(!user) {
    return res.status(404).send('User not found');
  }
  user.role = role;
  await user.save();
  res.send('Role updated');
});

module.exports = router;
