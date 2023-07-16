 const User = require("../../model/users");
const nodemailer = require("nodemailer");
let otpMap = new Map();

exports.signinGet = (req, res) => {
  if(req.session.userData){
    delete req.session.userData;
    return res.render('register');
  }
  res.render("register");
};

exports.siginPost = async (req, res) => {
  const data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNo: req.body.phoneNo,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    isBlocked: false,
  };

  const valid = await validation(req.body);

  if (valid.isValid) {
    req.session.userData = data;
    const otpGenerator = () => {
      const otp = Math.floor(100000 + Math.random() * 900000);
      return otp.toString();
    };

    const otp = otpGenerator();
    otpMap.set(data.email, otp)

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
      to: data.email,
      subject: "Shophub OTP verification",
      text: `The OTP for your verification is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error occurred:", error);
        res.render("register");
      } else {
        console.log("Email sent successfully:", info.response);
        return res.status(200).end();
      }
    });
  } else if (!valid.isValid) {
    return res.status(400).json({ error: valid.errors });
  }
};

exports.userOtpGet = (req, res) => {
  res.render("user_otp");
};

exports.userotpPost = async (req, res) => {
  const data = req.session.userData;
  const storedOtp = otpMap.get(data.email);
  console.log(storedOtp);
  if (req.body.otp == storedOtp) {
    await User.create(data);
    delete req.session.userData;
    res.redirect("/login");
  } else {
    res.render("user_otp");
  }
};

async function validation(data) {
  const { firstName, lastName, phoneNo, email, password, confirmPassword } =
    data;
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
  const existingUser = await User.findOne({email:email});

  if (!email) {
    errors.emailError = "Please Enter an Email";
  } else if (!emailRegex.test(email)) {
    errors.emailError = "please provide an valid Email";
  } else if(existingUser && email == existingUser.email){
    errors.emailError = 'This email is already registered';
  }

  if (!firstName) {
    errors.firstNameError = "Please Enter an Firstname";
  } else if (firstName.includes(" ")) {
    errors.firstNameError = "Invalid spacing between names";
  }

  if (!lastName) {
    errors.lastNameError = "Please Enter an Lastname";
  } else if (lastName.includes(" ")) {
    errors.lastNameError = "Invalid spacing between names";
  }

  if (!phoneNo) {
    errors.phoneNoError = "Please provide a Phone number";
  } else if (!phoneRegex.test(phoneNo)) {
    errors.phoneNoError = "Invalid Phone Number";
  }

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
