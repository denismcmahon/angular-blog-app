const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
require('dotenv').config();

const login = async (req, res) => {
  console.log('DM login endpoint called');
  const { username, password } = req.body;
  console.log('username and password', username, password);
  try {
    const user = await User.findOne({ username });
    console.log('user: ', user);
    if (!user) {
      return res.status(401).send('Invalid credentials');
    }
    console.log('DM ==> login route ==> password: ', password);
    console.log('DM ==> login route ==> user.password: ', user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('DM ==> login route ==> isMatch: ', isMatch);
    if (!isMatch) {
      return res.status(401).send('Invalid credentials');
    }
    console.log('DM ==> login route ==> setting up token');
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
    console.log('DM ==> login route ==> token: ', token);
    res.json({ token });
  } catch (error) {
    console.error('DM ==> login route error: ', error);
    res.status(500).send('An error occurred');
  }
}

const setPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    // verify token
    const user = await User.findOne({ token: token });
    if(!user) {
      return res.status(400).json({ message: 'Invalid token or user does not exist' });
    }

    // hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // update the users password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password successfully set!'});
  } catch (err) {
    console.error('DM ==> set-password route error: ', err);
    res.status(400).json({ message: 'Invalid token or user does not exist' });
  }
}

module.exports = {
  login,
  setPassword
};
