const Users = require("../model/users");
const Banners = require("../model/banner");
const Products = require("../model/products");

const isLogged = async (req, res, next) => {
  try {
    const banners = await Banners.find();
    const products = await Products.find();
    if (!req.session.email) {
      res.render("home", { loggedIn: false, banners, products });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

const blockCheck = async (req, res, next) => {
  try {
    if (req.session.email) {
      const userData = req.session.email;
      const id = userData._id;
      const user = await Users.findById(id);

      if (user && user.isBlocked) {
        // res.render("login", {loggedIn: false});
        delete req.session.email;
      } else {
        next();
      }
    } else {
      next();
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  isLogged,
  blockCheck,
};
