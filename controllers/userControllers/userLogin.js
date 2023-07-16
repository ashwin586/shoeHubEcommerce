const User = require("../../model/users");

exports.loginGet = (req, res) => {
  res.render("login", { loggedIn: false, error: false });
};

exports.loginPost = async (req, res) => {
  const { email } = req.body;
  const valid = await validation(req.body);
  if (valid.isValid) {
    if (valid.isBlocked) {
      return res.status(400).json({ error: valid.errors });
    }
    req.session.email = email;
    return res.status(200).end();
  } else {
    return res.status(400).json({ error: valid.errors });
  }
};

async function validation(data) {
  const { email, password } = data;
  const errors = {};

  if (!email) {
    errors.emailError = "Please provide an Email";
  }

  if (email && !password) {
    errors.passwordError = "Password Not Entered";
  }

  if ((email && password)) {
    const existingUser = await User.findOne({
      email: email,
    });

    if (!existingUser) {
      errors.loginError = "Incorrect Email or password";
    } else if (existingUser.password !== password) {
      errors.loginError = "Incorrect Email or password";
    } else if (existingUser.isBlocked) {
      errors.isBlockedError = "Your account has been blocked";
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
