const Products = require("../../model/products");
const User = require("../../model/users");
const Categories = require("../../model/category");

exports.userProductsViewGet = async (req, res) => {
  let result, category, sort, keyword, priceRange;
  let sortOption = {};
  const query = {};
  
  try {
    /////////////////////// GETTING CATEGORY IF ANY ////////////////////////
    if(req.query.category && req.query.category !== 'false'){
      category = req.query.category;
    } else {
      category = false;
    }
    
    //////////////////////// GETTING SORT VALUE IF ANY //////////////////////
    if(req.query.sort && req.query.sort !== "false"){
      sort = req.query.sort;
      if(req.query.sort == "lowToHigh"){
        sortOption.price = 1;
      } else if(req.query.sort == "highToLow"){
        sortOption.price = -1;
      }
    } else {
      sort = false;
    }

    /////////////////////// GETTING PRICE RANGE VALID IF ANY /////////////////////
    if(req.query.priceRange && req.query.priceRange !== 'false'){
      priceRange = req.query.priceRange;
      let priceRangeParts = priceRange.replaceAll(/₹/g, '').trim();
      priceRangeParts = priceRangeParts.split("-");
      query.price = {$gt: parseFloat(priceRangeParts[0]), $lt: parseFloat(priceRangeParts[1])};
    } else {
      priceRange = false;
    }

    //////////////////////// GETTING KEYWORD IF ANY ////////////////////////////////
    if(req.query.keyword && req.query.keyword !== "false"){
      keyword = req.query.keyword;
      query.name = new RegExp(keyword, 'i');
    } else {
      keyword = false;
    }

    const categories = await Categories.findOne({categoryName: category});
    if(categories){
      query.category = categories._id;
    }
    const totalProduct = await Products.countDocuments(query);
    const value = await Products.find(query).populate('category').sort(sortOption);
    const user = await User.findOne({ email: req.session.email });
    let wishlistedProduct = [];
    if (user) {
      wishlistedProduct = user.wishlist;
    }
    const currentPage = parseInt(req.query.page) || 1;
    const productsPerPage = 6;
    const skip = (currentPage - 1) * productsPerPage;

    const totalCount = await Products.countDocuments(query);
    const totalPages = Math.ceil(totalCount / productsPerPage);
    const products = await Products.find(query).sort(sortOption).skip(skip).limit(productsPerPage);
    if (req.session.email && !user.isBlocked) {
      res.render("user_product_view", {
        products,
        loggedIn: true,
        totalCount,
        totalPages,
        currentPage,
        wishlistedProduct,
        category, 
        noMoredata: Boolean(false), 
        sort,
        keyword,
        priceRange
      });
    } else {
      res.render("user_product_view", {
        products,
        loggedIn: false,
        totalCount,
        totalPages,
        currentPage,
        wishlistedProduct,
        category, 
        noMoreData: Boolean(false), 
        sort,
        keyword,
        priceRange
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
