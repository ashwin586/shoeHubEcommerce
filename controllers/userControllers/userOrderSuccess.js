exports.userOrderSuccessGet = async (req, res) => {
  try {
    res.render("order_success", { loggedIn: true });
  } catch (err) {
    console.log(err);
  }
};
