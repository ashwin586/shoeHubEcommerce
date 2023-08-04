const User = require("../../model/users");
const Product = require("../../model/products");
const Order = require("../../model/orders");
const Razorpay = require("razorpay");
const Coupons = require("../../model/coupon");
require("dotenv").config();

exports.userCheckOutGet = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.session.email });
    const userCart = user.cart;
    const userWallet = user.wallet.balance;
    if (req.session.email && !user.isBlocked) {
      const razorpayApiKey = process.env.KEY_ID;
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
        razorpayApiKey,
        userWallet,
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
    const couponCode = req.body.couponCode;
    const totalAmount = req.body.totalAmount;
    const newTotal = parseInt(req.body.newTotal);
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

    async function placeOrder() {
      const expectedDeliveryDate = new Date();
      expectedDeliveryDate.setDate(expectedDeliveryDate.getDate() + 5);

      const order = new Order({
        userId: userId,
        product: productData,
        address: addressId,
        total: newTotal,
        orderId: orderId,
        paymentMethod: paymentMethod,
        expectedDate: expectedDeliveryDate,
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

      const coupon = await Coupons.findOne({code: couponCode});
      if(coupon){
        coupon.usedBy = userId;
        await coupon.save();
      }
    }


    if (addressId) {
      if (paymentMethod == "cashOnDelivery") {
        placeOrder();
        res.status(200).end();
      } else if (paymentMethod == "razorPay") {
        const razorpay = new Razorpay({
          key_id: process.env.KEY_ID,
          key_secret: process.env.KEY_SECRET,
        });

        await razorpay.orders.create({
          amount: newTotal * 100,
          currency: "INR",
          receipt: "ShoeHub",
        });
        placeOrder();
        res.status(200).end();
      } else if (paymentMethod == "wallet") {
        try {
          const walletBalance = req.body.walletBalance;
          const user = await User.findById(userId);
          user.wallet.balance = walletBalance;
          await user.save();

          const transaction = {
            date: new Date(),
            details: `Order confirmation - ${orderId}`,
            status: "Debit",
          };
          await User.findByIdAndUpdate(
            userId,
            { $push: { "wallet.transactions": transaction } },
            { new: true }
          );

          placeOrder();
          res.status(200).end();
        } catch (err) {
          console.log(err);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};


////////////////////////// FOR CHECKING COUPON /////////////////////////
exports.userCouponCheck = async (req, res) => {
  try {
    const valid = await couponCheck(req.body);
    if (!valid.isValid) {
      return res.status(400).json({ error: valid.errors });
    }

    if (valid.isValid) {
      const { enteredCoupon, totalAmount } = req.body;
      let discountedPrice = 0;
      const user = await User.findOne({email: req.session.email});
      const userId = user._id;
      const coupon = await Coupons.findOne({ code: enteredCoupon });
      const couponDiscount = coupon.discount;
      const couponMinDiscount = coupon.minDiscount;
      const couponMaxDiscount = coupon.maxDiscount;

      let discountAmount = parseInt(totalAmount * (couponDiscount / 100));
      if(discountAmount > coupon.maxDiscount){
        discountAmount = coupon.maxDiscount
      }

      coupon.usedBy.forEach(user =>{
        if(user.toString() == userId){
          console.log("came")
          return res.status(402).json({error: 'You have already applied this coupon'});
        }
      })

      if(coupon.usedBy == userId){
        return res.status(402).json({error: 'You have already applied this coupon'});
      } 
      if(discountAmount < couponMinDiscount){
        return res.status(401).json({error: `Minimum amount for this coupon is not reached. Please increase the price`});
      } else if(discountAmount >= couponMaxDiscount){
        discountedPrice = totalAmount - couponMaxDiscount;
        return res.status(200).json({success: `Maximum amount for this coupon is reached so ${couponMaxDiscount} has been discounted`, discountedPrice, discountAmount});
      } else {
        discountedPrice = totalAmount - discountAmount;
        return res.status(200).json({success: "Coupon has been applied", discountedPrice, discountAmount});
      }
    }
  } catch (err) {
    console.log(err);
  }
};


////////////////////// FOR CHECKING THE COUPON VALIDATION FUNCTION //////////////////
async function couponCheck(data) {
  const { enteredCoupon } = data;
  const errors = {};
  const coupon = await Coupons.findOne({ code: enteredCoupon });

  if (!enteredCoupon) {
    errors.couponError = "If you have a coupon apply it to get discount";
  }

  if (!coupon) {
    errors.couponError = "The Provide coupon is not valid";
  } else if (coupon && coupon.status == false) {
    errors.couponError = "This Coupon has been expired";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}