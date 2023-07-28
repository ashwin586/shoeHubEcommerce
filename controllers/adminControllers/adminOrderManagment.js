const Orders = require("../../model/orders");
const Users = require("../../model/users");

exports.adminOrderViewGet = async (req, res) => {
  try {
    const orders = await Orders.find();
    const users = await Users.find();
    res.render("admin_orders_view", { orders, users });
  } catch (err) {
    console.log(err);
  }
};

exports.adminOrderStatusPost = async (req, res) => {
    try{
        const newStatus = req.body.newStatus;
        const orderId = req.body.orderId;
        const order = await Orders.findOne({_id: orderId});
        order.status = newStatus;
        await order.save();
        
    }catch(err) {
        console.log(err);
    }
}
