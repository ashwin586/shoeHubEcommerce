const product = require("../../model/products")

exports.userLogoutGet = async (req, res) => {
  const products = await product.find();
  delete req.session.email;
  res.render("home", {products});
};
