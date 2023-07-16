const User = require("../../model/users");
const Category = require("../../model/category")
const nodemailer = require("nodemailer");
const otpMap = new Map();

exports.verifyEmailGet = (req, res) => {
  res.render("user_email_verify");
};

exports.verifyEmailPost = (req, res) => {
  const email = req.body.email;

  const otpGenerator = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
  };

  const otp = otpGenerator();
  otpMap.set(email, otp);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAILPASSWORD,
    },
  });

  const mailOptions = {
    from: "ashwinv586@gmail.com",
    to: email,
    subject: "Shophub OTP verification",
    text: `The OTP for your verification is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    req.session.email = email; 
    res.redirect("/user_otp_verifyGet");
  });
};

exports.verifyOtpGet = (req, res) => {
  res.render("user_otp");
};

exports.verifyOtpPost = async (req, res) => {
  const email = req.session.email;
  // const categories = await Category.find();
  const storedOtp = otpMap.get(email);
  if (req.body.otp == storedOtp) {
    res.redirect("/user_confirm_passwordGet");
  } else {
    res.render("user_otp");
  }
};

exports.resendOtp = (req, res) => {
  
}

exports.confirmPasswordGet = (req, res) => {
  res.render("confirm_password");
};

exports.confirmPasswordPost = async (req, res) => {
  const email = req.session.email;
  const password = req.body.password;
  const valid = await validation(req.body);
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      if (valid.isValid) {
        existingUser.password = password;
        await existingUser.save();
        otpMap.delete(email);
        delete req.session.email;
        return res.status(200).end();
      } else {
        return res.status(400).json({ error: valid.errors });
      }
    } else {
      console.log("user_not_found");
    }
  } catch (err) {
    console.log(err);
  }
};

async function validation(data) {
  const { password, confirmPassword } = data;
  const errors = {};
  if (!password) {
    errors.passwordError = "Please provide a Password";
  } else if (password.length < 8) {
    errors.passwordError = "Password length should be atleast 8";
  }

  if (password != confirmPassword && password.length > 0) {
    errors.confirmPasswordError = "The password do not match";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
