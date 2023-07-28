const nodemailer = require('nodemailer')
async function sendemail(Email,username,contact) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_SENDER, // generated ethereal user
          pass: process.env.PASSWORD_EMAIL_SENDER, // generated ethereal password
        },
    });
    await transporter.sendMail({
        from: 'CCNA_email_verify <ccna.email.sender@gmail.com>',
        to: Email,
        subject: "CCNA Verification. Please verify your account",
        html: `
              <div>You have a contact form submission ${username} !!</div>
              <br/>
              <div>Please verify your Email : <a href='http://localhost:3000/verifycation/${contact}'>Click here to verify</a></div>
              `
    });
}
module.exports = { sendemail };
