const Products = require("../../model/products");

exports.userProductsViewGet = async (req, res) => {
  try {
    const currentPage = parseInt(req.query.page) || 1;
    const productsPerPage = 6;
    const skip = (currentPage - 1) * productsPerPage;

    const totalCount = await Products.countDocuments();
    const totalPages = Math.ceil(totalCount / productsPerPage);
    const products = await Products.find().skip(skip).limit(productsPerPage);
    if (req.session.email) {
      res.render("user_product_view", {
        loggedIn: true,
        products,
        totalCount,
        totalPages,
        currentPage,
      });
    } else {
      res.render("user_product_view", {
        loggedIn: false,
        products,
        totalCount,
        totalPages,
        currentPage,
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
    const totalCount = await Products.countDocuments({ category: categoryId });
    if (req.session.email) {
      res.render("user_product_category_view", {
        loggedIn: true,
        products,
        totalCount,
      });
    } else {
      res.render("user_product_category_view", {
        loggedIn: false,
        products,
        totalCount,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.userProductDetailsGet = async (req,res) => {
  const id = req.params.product_id;
  const product = await Products.findById(id);
  if(req.session.email){
    res.render("user_product_details", {loggedIn: true, product});
  } else {
    res.render("user_product_details", {loggedIn: false, product});
  }  
}
