const User = require("../../model/users");
const Product = require("../../model/products");
const Order = require("../../model/orders");

exports.userCheckOutGet = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.session.email });
    const userCart = user.cart;
    if (req.session.email && !user.isBlocked) {
      const cartItemsWithDetails = await Promise.all(
        userCart.map(async (cartItem) => {
          const product = await Product.findById(cartItem.product);
          return {
            name: product.name,
            price: product.price,
            quantity: cartItem.quantity,
          };
        })
      );
      const userAddresses = user.address;
      res.render("checkout", {
        loggedIn: true,
        cartItemsWithDetails,
        userAddresses,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.userCheckOutPost = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.session.email }).populate(
      "cart.product"
    );
    const userId = user._id;
    const totalAmount = req.body.totalAmount;
    const addressId = req.body.selectedAddressId;
    const paymentMethod = req.body.selectedPayment;
    const productData = user.cart.map((item) => {
      return {
        id: item.product._id,
        name: item.product.name,
        category: item.product.category,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.imageUrl[0].url,
      };
    });

    const char = Math.random().toString(36).substring(2, 7);
    const int = Math.floor(100000 + Math.random() * 900000);
    const orderId = char + int;

    async function order() {
      const ExpectedDeliveryDate = new Date();
      ExpectedDeliveryDate.setDate(ExpectedDeliveryDate.getDate() + 5);

      const order = new Order({
        userId: userId,
        product: productData,
        address: addressId,
        total: totalAmount,
        orderId: orderId,
        paymentMethod: paymentMethod,
      });

      await order.save();

      let userDetails = await User.findById(userId);
      let userCartDetails = userDetails.cart;

      userCartDetails.forEach(async (item) => {
        const productId = item.product;
        const quantity = item.quantity;

        const product = await Product.findById(productId);
        const stock = product.stock;
        const updatedStock = stock - quantity;

        await Product.findByIdAndUpdate(
          productId,
          { $set: { stock: updatedStock } },
          { new: true }
        );
      });
      await User.findByIdAndUpdate(
        userId,
        {
          $set: { cart: [] },
        },
        { new: true }
      );
    }

    if (addressId) {
      if (paymentMethod == "cashOnDelivery") {
        order();
        res.status(200).end();
      }
    }
  } catch (err) {
    console.log(err);
  }
};
