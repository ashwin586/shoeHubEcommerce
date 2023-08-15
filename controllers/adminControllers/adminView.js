const Orders = require("../../model/orders");
const Products = require("../../model/products");
const Users = require("../../model/users");
const moment = require('moment');

exports.adminDashboard = async (req, res) => {
  let totalRevenue = 0;
  const totalUsers = (await Users.find()).length;
  const totalProducts = (await Products.find()).length;
  const totalOrders = (await Orders.find()).length;

  (await Orders.find()).forEach((total) => {
    if (total.amountAfterDiscount == undefined) {
      totalRevenue += total.total;
    } else {
      totalRevenue += total.amountAfterDiscount;
    }
  });
  res.render("admin_dashboard", {
    totalUsers,
    totalProducts,
    totalOrders,
    totalRevenue,
  });
};

exports.adminChart = async (req, res) => {
  try {
    const {startDate, endDate} = req.query;
    const start = moment(startDate);
    const end = moment(endDate);

    const orders = await Orders.find({
        date: {$gte: start.toDate(), $lte: end.toDate()}
    });
    const labels = orders.map(order => order.date.toISOString().split('T')[0]);
    const values = orders.map(order => order.total);
    
    res.status(200).json({labels, values});
  } catch (err) {
    console.log(err);
  }
};
