const User = require("../../model/users");
const Product = require("../../model/products");

exports.userCartGet = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.session.email }).populate({
      path: "cart.product",
      model: "Product",
    });
    const cartItems = user.cart;
    let subTotal = 0;
    let errorMessage = [];
    for (const cartItem of cartItems) {
      let cartItemPrice = 0;
      if (cartItem.product.offerPrice > 0) {
        cartItemPrice = cartItem.product.offerPrice;
      } else {
        cartItemPrice = cartItem.product.price;
      }
      const itemPrice = cartItemPrice * cartItem.quantity;
      subTotal += itemPrice;

      if (cartItem.quantity > cartItem.product.stock) {
        errorMessage.push(`Out of Stock`);
      } else {
        errorMessage.push("");
      }
    }
    res.render("user_cart", {
      loggedIn: true,
      cart: user.cart,
      subTotal,
      errorMessage,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.userCartPost = async (req, res) => {
  const productId = req.params.productid;
  const quantity = parseInt(req.params.quantity);
  const product = await Product.findById(productId);
  if (product.stock == 0) {
    return res.status(400).end();
  }
  try {
    const user = await User.findOne({ email: req.session.email });
    if (!user) {
      return res.render("login", { loggedIn: false });
    }

    if (quantity > product.stock) {
      return res.status(400).end();
    }

    const cartItem = user.cart.find(
      (item) => item.product.toString() === productId.toString()
    );
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity: quantity });
    }
    await user.save();
    return res.status(200).end();
  } catch (err) {
    console.log(err);
  }
};

exports.userCartQuantityUpdate = async (req, res) => {
  const { productId, newQuantity } = req.body;
  const user = await User.findOne({ email: req.session.email });
  const cartItem = user.cart.find(
    (item) => item.product.toString() == productId
  );
  const product = await Product.findById(cartItem.product);
  let productActualAmount = 0;
  if (product.offerPrice > 0) {
    productActualAmount = product.offerPrice;
  } else {
    productActualAmount = product.price;
  }
  try {
    if (cartItem) {
      cartItem.quantity = newQuantity;
    }
    const total = cartItem.quantity * productActualAmount;
    if (cartItem.quantity > product.stock) {
      return res
        .status(400)
        .json({ error: "Out of stock", productId: product._id });
    }
    const fullCartTotal = user.cart.reduce((acc, item) => {
      let productPrice = 0;
      if (item.product.offerPrice > 0) {
        productPrice = item.product.offerPrice;
      } else {
        productPrice = item.product.price;
      }
      // const productPrice = item.product.price;
      return acc + productPrice * item.quantity;
    }, 0);

    await user.save();
    res
      .status(200)
      .json({
        updatedQuantity: cartItem.quantity,
        total,
        fullCartTotal,
        productId: product._id,
      });
  } catch (err) {
    console.log(err);
  }
};

exports.userCartRemovePost = async (req, res) => {
    const productId = req.params.id;
    try {
      const user = await User.findOne({ email: req.session.email });
      if(user && user.isBlocked){
        return res.status(301).end();
      }
      if (user) {
        const index = user.cart.findIndex(
          (item) => item.product.toString() === productId
        );
        if (index > -1) {
          user.cart.splice(index, 1);
          await user.save();
          return res.status(200).end();
        }
      }
    } catch (err) {
      console.log(err);
    }
};
