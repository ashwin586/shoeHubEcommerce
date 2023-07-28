const Products = require("../../model/products");
const User = require("../../model/users");

exports.userProductsViewGet = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.session.email });
    let wishlistedProduct = [];
    if (user) {
      wishlistedProduct = user.wishlist;
    }
    const currentPage = parseInt(req.query.page) || 1;
    const productsPerPage = 6;
    const skip = (currentPage - 1) * productsPerPage;

    const totalCount = await Products.countDocuments();
    const totalPages = Math.ceil(totalCount / productsPerPage);
    const products = await Products.find().skip(skip).limit(productsPerPage);
    if (req.session.email && !user.isBlocked) {
      res.render("user_product_view", {
        loggedIn: true,
        products,
        totalCount,
        totalPages,
        currentPage,
        wishlistedProduct,
      });
    } else {
      res.render("user_product_view", {
        loggedIn: false,
        products,
        totalCount,
        totalPages,
        currentPage,
        wishlistedProduct,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.userCategoryProductViewGet = async (req, res) => {
  try {
    const categoryId = req.query.category;
    const products = await Products.find({ category: categoryId });
    const user = await User.findOne({ email: req.session.email });
    let wishlistedProduct = [];
    if (user) {
      wishlistedProduct = user.wishlist;
    }

    const totalCount = await Products.countDocuments({ category: categoryId });
    if (req.session.email && !user.isBlocked) {
      res.render("user_product_category_view", {
        loggedIn: true,
        products,
        totalCount,
        wishlistedProduct,
      });
    } else {
      res.render("user_product_category_view", {
        loggedIn: false,
        products,
        totalCount,
        wishlistedProduct,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.userProductDetailsGet = async (req, res) => {
  const id = req.params.product_id;
  const product = await Products.findById(id);
  const user = await User.findOne({ email: req.session.email });
  let userCartItems = 0;
  if(user){
    userCartItems = user.cart.length;
  }
  if (req.session.email && !user.isBlocked) {
    res.render("user_product_details", {
      loggedIn: true,
      product,
      userCartItems,
    });
  } else {
    res.render("user_product_details", {
      loggedIn: false,
      product,
      
    });
  }
};

exports.userFilterCategory = async (req, res) => {
  const categoryId = req.params.categoryid;
  const page = parseInt(req.query.page) || 1; // Get the page number from the query parameter or default to 1
  const perPage = 6;
  try {
    const totalProducts = await Products.countDocuments({
      category: categoryId,
    });
    const totalPages = Math.ceil(totalProducts / perPage);
    const skip = (page - 1) * perPage;

    const user = await User.findOne({ email: req.session.email });
    let wishlistedProduct = [];
    if (user) {
      wishlistedProduct = user.wishlist;
    }
    const categorizedProduct = await Products.find({ category: categoryId })
      .skip(skip)
      .limit(perPage);
    res.json({ categorizedProduct, wishlistedProduct, page, totalPages });
  } catch (err) {
    console.log(err);
  }
};
