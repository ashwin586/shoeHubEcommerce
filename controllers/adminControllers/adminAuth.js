require('dotenv').config();


exports.adminLoginGet = (req, res) => {
    if(req.session.adminEmail){
        res.redirect('/admin')
    } else {
        res.render("admin_login");
    }
};

exports.adminLoginPost = (req, res) => {
  if (
    req.body.email == process.env.ADMINEMAIL &&
    req.body.password == process.env.ADMINPASSWORD
  ) {
    req.session.adminEmail = req.body.email;
    res.redirect("/admin");
  } else {
    res.render("admin_login");
  }
};

exports.adminLogoutGet = (req, res) => {
  delete req.session.adminEmail;
  res.redirect('/admin_login');
}