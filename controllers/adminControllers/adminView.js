exports.adminDashboard = (req, res) => {
  if (req.session.adminEmail) {
    res.render("admin_dashboard");
  } else {
    res.render("admin_login");
  }
};
