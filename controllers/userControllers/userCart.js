const User = require("../../model/users");
const Product = require("../../model/products");

exports.userCartGet = async (req, res) => {
  if (req.session.email) {
    try {
      const user = await User.findOne({ email: req.session.email }).populate({
        path: "cart.product",
        model: "Product",
      });
      const cartItems = user.cart;
      let subTotal = 0;
      for (const cartItem of cartItems) {
        const itemPrice = cartItem.product.price * cartItem.quantity;
        subTotal += itemPrice;
      }
      res.render("user_cart", { loggedIn: true, cart: user.cart, subTotal });
    } catch (err) {
      console.log(err);
    }
  }
};

exports.userCartPost = async (req, res) => {
  if (req.session.email) {
    const productId = req.params.productid;
    const quantity = parseInt(req.params.quantity);
    try {
      const user = await User.findOne({ email: req.session.email });
      if (!user) {
        res.render("login", { loggedIn: false });
        return;
      }
      const cartItem = user.cart.find(
        (item) => item.product.toString() === productId
      );
      if (cartItem) {
        cartItem.quantity = quantity;
      } else {
        user.cart.push({ product: productId, quantity: quantity });
      }
      await user.save();
    } catch (err) {
      console.log(err);
    }
  }
};


exports.userCartRemovePost = async (req, res) => {
  if (req.session.email) {
    const productId = req.params.id;
    try {
      const user = await User.findOne({ email: req.session.email });
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
  }
};
