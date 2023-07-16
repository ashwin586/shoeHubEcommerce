const Category = require("../../model/category");
const Product = require('../../model/products');
const User = require("../../model/users")

exports.home = async (req, res) => {
  try {
    const category = await Category.find();
    const products = await Product.aggregate([{$sample: {size:5}}]);
    const user = await User.findOne({email: req.session.email});
    if (req.session.email && !user.isBlocked) {
      res.render("home", { loggedIn: true, categories: category, products });
    } else {
      res.render("home", { loggedIn: false, categories: category, products });
    }
  } catch (err) {
    console.log(err);
  }
};
