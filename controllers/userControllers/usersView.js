const Category = require("../../model/category");
const Product = require("../../model/products");
const User = require("../../model/users");
const Banners = require("../../model/banner");

exports.home = async (req, res) => {
  try {
    const category = await Category.find({ isAvailable: true });
    const products = await Product.aggregate([{ $sample: { size: 5 } }]);
    const user = await User.findOne({ email: req.session.email });
    const banners = await Banners.find();
    res.render("home", {
      loggedIn: true,
      categories: category,
      products,
      banners,
    });
  } catch (err) {
    if (err.response.status == 300) {
      window.location.href = "/login";
    }
    console.log(err);
  }
};
