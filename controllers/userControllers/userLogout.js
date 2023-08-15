const product = require("../../model/products")
const Banners = require("../../model/banner");

exports.userLogoutGet = async (req, res) => {
  try{
    const products = await product.find();
    const banners = await Banners.find();
    delete req.session.email;
    res.render("home", {products, loggedIn:false, banners});
  } catch(err){
    console.log(err);
  }
};