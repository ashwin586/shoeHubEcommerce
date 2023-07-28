const product = require("../../model/products")

exports.userLogoutGet = async (req, res) => {
  try{
    const products = await product.find();
    delete req.session.email;
    res.render("home", {products, loggedIn:false});
  } catch(err){
    console.log(err);
  }
  
};
