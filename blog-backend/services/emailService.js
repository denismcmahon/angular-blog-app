const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'denismcmahon@gmail.com',
    pass: 'ziku aijw hqot qrkh'
  }
})

async function sendPasswordSetupEmail(email, token) {
  console.log('DM ==> sendPasswordSetupEmail ==> email: ', email);
  const link = `http://localhost:4200/set-password/${token}`;
  const mailOptions = {
    from: 'denismcmahon@gmail.com',
    to: email,
    subject: 'Set Up Your Password',
    text: `Welcome! Please click the following link to set up your password: ${link}`
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
