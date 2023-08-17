const Users = require("../model/users");
const Banners = require("../model/banner");
const Products = require("../model/products");
const Category = require("../model/category");

//////////////////////////////////// FOR CHECKING IF THERE IS AN USER OR NOT //////////////////////////////////////
const isLogged = async (req, res, next) => {
  try {
    const banners = await Banners.find();
    const products = await Products.find();
    const category = await Category.find({ isAvailable: true });
    if (!req.session.email) {
      res.render("home", {
        loggedIn: false,
        banners,
        products,
        categories: category,
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

//////////////////////////////////// FOR POST METHOD IF THE USER IS THER OR NOT ///////////////////////////////
const isUser = async (req, res, next) => {
  try {
    if (!req.session.email) {
      res.status(300).end();
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

const userLogout = async (req, res, next) => {
  try {
    delete req.session.email;
  } catch (err) {
    console.log(err);
  }
};

///////////////////////////////////// FOR CHECKING IF THE USER IS BLOCKED OR NOT /////////////////////////////////
const blockCheck = async (req, res, next) => {
  try {
    const userData = req.session.email;
    const user = await Users.findOne({email: userData});
    if (user && user.isBlocked === true) {
      return res.status(301).end();
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  isLogged,
  blockCheck,
  isUser,
  userLogout,
};
