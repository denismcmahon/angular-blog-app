const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'denismcmahon@gmail.com',
    pass: 'ziku aijw hqot qrkh'
  }
})

async function sendPasswordSetupEmail(email, token, setType) {
  const linkType = setType === 'new-user' ? 'set-password' : 'reset-password';
  const link = `http://localhost:4200/${linkType}/${token}`;
  const subject = setType === 'new-user' ? 'Set Up Your Password' : 'Reset Your Password';
  const message = setType === 'new-user' ? 'Welcome! Please click the following link to set up your password: ' : 'Please click the following link to reset your password: ';
  const mailOptions = {
    from: 'denismcmahon@gmail.com',
    to: email,
    subject: subject,
    text: `${message}: ${link}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
        console.log('Error occured while sending email: ', error.message);
    } else {
        console.log('Message sent %s: ', info.messageId);
    }
  });
}

module.exports = { sendPasswordSetupEmail };
