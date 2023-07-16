const Category = require('../model/category');

const userHeaderMiddleware = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.locals.categories = categories;
    next();
  } catch (err) {
    res.status(500).send(err)
  }
};

module.exports = userHeaderMiddleware;