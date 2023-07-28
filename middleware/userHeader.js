const Category = require("../model/category");
const User = require("../model/users");

const userHeaderMiddleware = async (req, res, next) => {
  try {
    const categories = await Category.find();
    const user = await User.findOne({ email: req.session.email });
    if (user) {
      const userCartItems = user.cart.length;
      res.locals.cartItemsCount = userCartItems;
    } 
    res.locals.categories = categories;
    next();
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = userHeaderMiddleware;
