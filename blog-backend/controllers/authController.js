const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { sendPasswordSetupEmail } = require('../services/emailService');

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    console.log('user: ', user);
    if (!user) {
      return res.status(401).send('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

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
    const user = await User.findOne({ passwordSetToken: token, tokenExpires: { $gt: Date.now() }});
    if(!user) {
      return res.status(400).json({ message: 'Invalid token or user does not exist' });
    }

    // hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // update the users password
    user.password = hashedPassword;
    user.passwordSetToken = undefined;
    user.tokenExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password successfully set!'});
  } catch (err) {
    console.error('DM ==> set-password route error: ', err);
    res.status(400).json({ message: 'Invalid token or user does not exist' });
  }
}

const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = crypto.randomBytes(16).toString('hex');
    user.passwordSetToken = token;
    user.tokenExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // send email for passowrd setup
    await sendPasswordSetupEmail(email, token, 'reset');

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ message: 'Error requesting password reset', error });
  }
}

const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    // verify token
    const user  = await User.findOne({ passwordSetToken: token, tokenExpires: { $gt: Date.now() }});

    if (!user) {
      return res.status(400).send('Password reset token is invalid or has expired');
    }

    // hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.passwordSetToken = undefined;
    user.tokenExpires = undefined;

    await user.save();

    res.status(200).json({ message: 'Password has been reset' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password', error });
  }
}

module.exports = {
  login,
  setPassword,
  requestPasswordReset,
  resetPassword
};
