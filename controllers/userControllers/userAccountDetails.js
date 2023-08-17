const User = require("../../model/users");
const Order = require("../../model/orders");

exports.userAccountDeatailsGet = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.session.email });
      const userId = user._id;
      const order = await Order.find({ userId: userId }).sort({ date: -1 });
      const userAddresses = user.address;

      res.render("user_account", {
        loggedIn: true,
        user,
        userAddresses,
        order,
      });
  } catch (err) {
    console.log(err);
  }
};

exports.userAccountDetailsEditPost = async (req, res) => {
  try {
    const accountDetails = req.body;
    const user = await User.findOne({ email: req.session.email });
    if (user) {
      user.firstName = accountDetails.firstName || user.firstName;
      user.lastName = accountDetails.lastName || user.lastName;
      user.phoneNo = accountDetails.phoneNo || user.phoneNo;
      if (
        accountDetails &&
        accountDetails.newPassword > 6 &&
        accountDetails.newPassword == accountDetails.confirmNewPassword
      ) {
        user.password = accountDetails.newPassword;
      }
    }
    await user.save();
    return res.status(200).end();
  } catch (err) {
    console.log(err);
  }
};
