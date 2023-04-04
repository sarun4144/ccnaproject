const nodemailer = require('nodemailer')
async function sendemail(Email,username,contact) {
    const transporter = nodemailer.createTransport({
        host: "gmail",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_SENDER, // generated ethereal user
          pass: process.env.PASSWORD_EMAIL_SENDER, // generated ethereal password
        },
    });
    await transporter.sendMail({
        from: 'CCNA_email_verify <ccna.email.sender@gmail.com>',
        to: Email,
        subject: "Please verify your account",
        html: `
              <div>You have a contact form submission ${username} !!</div>
              <br/>
              <div>Please verify your Email : <a href='http://localhost:3000/verifycation/${contact}'>Click here to verify</a></div>
              `
    });
}
module.exports = { sendemail };
