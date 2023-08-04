const Users = require("../../model/users");
const Orders = require("../../model/orders");

exports.userOrderHistoryGet = async (req, res) => {
  if (req.session.email) {
    try {
      const user = await Users.findOne({ email: req.session.email });
      if (req.session.email && !user.isBlocked) {
        const userId = user._id;
        const order = await Orders.find({ userId: userId }).sort({ date: -1 });
        const userAddresses = user.address;
        res.render("user_order_history", {
          loggedIn: true,
          user,
          userAddresses,
          order,
        });
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    res.render("home", { loggedIn: false });
  }
};

exports.userOrderDetailsGet = async (req, res) => {
  try {
    const orderId = req.query.orderId;
    const order = await Orders.findById(orderId);
    if (req.session.email) {
      const user = await Users.findOne({ email: req.session.email });
      const userAddress = user.address.find(
        (address) => address.id === order.address
      );
      if (order) {
        res.render("user_order_details", {
          loggedIn: true,
          orders: order,
          address: userAddress,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

exports.userOrderCancel = async (req, res) => {
  try {
    const { isChecked, orderId } = req.body;
    if (isChecked == null) {
      const error = "Please select an option";
      return res.status(400).json({ error });
    }
    const order = await Orders.findById(orderId);
    
    if (order.paymentMethod == "razorPay" || order.paymentMethod == 'wallet') {
      const user = await Users.findOne({ email: req.session.email });
      user.wallet.balance += order.total;

      const transaction = {
        date: new Date(),
        details: `Order Cancellation - Order Id: ${orderId}`,
        amount: order.total,
        status: "Credit",
      };

      user.wallet.transactions.push(transaction);
      await user.save();
    }
    order.status = "Cancelled"
    await order.save();
    return res.status(200).end();

  } catch (err) {
    {
      console.log(err);
    }
  }
};

exports.userOrderReturn = async (req, res) => {
  try{
    const {isChecked, orderId} = req.body;
    if(isChecked == null){
      const error = "Please select an option";
      return res.status(400).json({error});
    } 
    const order = await Orders.findById(orderId);
    const user = await Users.findOne({email: req.session.email});
    user.wallet.balance += order.total;

    const transaction = {
      date: new Date(),
      details: `Order Returned - Order Id: $ {orderId}`,
      amount: order.total,
      status: "Credit",
    }

    user.wallet.transactions.push(transaction);
    await user.save();

    order.status = "Returned";
    await order.save();

  }catch(err){
    console.log(err);
  }
}
