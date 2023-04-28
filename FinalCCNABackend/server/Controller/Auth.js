const User = require('../Model/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendemail } = require("../email/sendemail")
const { ObjectId } = require('mongodb')
exports.register = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    //Check user 
    let Euser = await User.findOne({ email });
    let name = await User.findOne({ username });
    if (Euser || name) {
      return res.status(400).json('มี email หรือ username นี้แล้ว');
    }
    user = new User({
      email,
      username,
      password,

    });
    // Encryt password  
    const cracker = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, cracker);
    await user.save();

    const Regisuser = await User.findOne({ email: email })
    console.log("RGISTER_ID", Regisuser)
    try {
      sendemail(email, username, Regisuser._id)
      res.status(200).json(
        "สมัครสมาชิกสำเร็จตรวจสอบ email เพื่อยืนยันตัวตน (อาจจะถูกส่งมาใน junk mail)"
      );
    } catch (err) {
      console.log("Email ERROE", err)
      const serial = Math.random().toString().substring(2, 12)
      res.status(500).send("EMAIL SENDER SERVER ERROR !!! " + serial)
    }
    // res.status(200).json("Regis complete")
  } catch (err) {

    // check error
    console.log(err.message);
    res.status(500).send('Server Error');
  }


}
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    var user = await User.findOneAndUpdate({ email }, { new: true });

    if (user) {
      if (user.enabled) {
        // Check Password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(400).send("Password ไม่ถูกต้อง");
        }
        // Payload
        const payload = {
          user: {
            id: user._id,
            email: user.email,
            username: user.username,
            role: user.role
          }
        }
        // Generate Token
        jwt.sign(payload, 'SecretToken', { expiresIn: 36000 }, (err, token) => {
          if (err) {
            throw err;
          }
          res.status(200).json({ token, payload });
        });
      } else {
        return (res.status(400).send("คุณยังไม่ได้ยืนยัน e-mail กรุณาตรวจสอบ e-mail เพื่อยืนยัน"))
      }

    } else {
      return (res.status(400).send("ไม่มี e-mail ในระบบ กรุณาสมัครสมาชิก'"))
    }

  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
}
//admin and user use togather
exports.currentUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id })
      .select('-password').exec();
    console.log("Controller-Current", user);
    res.status(200).send(user)
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
}
exports.verifycation = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
    if (user.enabled == true && user != null) {
      res.status(200).json('You already verify your email Please login')
    } else {
      if (user == null) {
        res.status(402).send("Your Email is not register")
      } else {
        await User.findOneAndUpdate({ _id: req.params.id },
          { enabled: true })
        console.log("adasd", user)
        res.status(200).send('Verifycation complete please login')
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Your Email is not register");
  }
}


