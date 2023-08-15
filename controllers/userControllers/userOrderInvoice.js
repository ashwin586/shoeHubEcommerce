const pdfDocument = require("pdfkit");
const Orders = require("../../model/orders");
const Users = require("../../model/users");
const path = require("path");

const spartanMB = path.join(
  __dirname,
  "../../assets/fonts/Spartan MB SemiBold.ttf"
);

exports.userOrderInvoice = async (req, res) => {
  try {
    const orderId = req.body.orderId;
    const doc = new pdfDocument({
      size: [700, 792],
    });

    const order = await Orders.findOne({ _id: orderId }).populate("userId");
    const user = order.userId;
    const addressId = order.address;
    const userAddress = user.address.find(
      (addr) => addr._id.toString() == addressId.toString()
    );
    
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=order_invoice.pdf"
    );

    doc.pipe(res);

    doc.font(spartanMB).fontSize(20).text("Order Invoice", { align: "center" });
    doc.moveDown(1.2);

    // Order Details
    doc.font(spartanMB).fontSize(18).text("Order Details:");
    doc.moveDown(0.2);
    doc.fontSize(12).text(`Order ID: ${order._id}`);
    doc.text(`Ordered Date: ${order.date.toLocaleDateString()}`);
    doc.text(`Order Delivered Date: ${order.deliveredDate.toLocaleDateString()}`);

    // Customer Information
    doc.moveDown(1.2);
    doc.font(spartanMB).fontSize(18).text("Customer Information:");
    doc.moveDown(0.2);
    doc.fontSize(12).text(`Name: ${userAddress.name}`);
    doc.text(`Email: ${userAddress.email}`);
    doc.text(`Phone No: ${userAddress.phoneNo}`);
    doc.text(`Payment Method: ${order.paymentMethod}`);
    doc.text(
      `Address: ${userAddress.streetAddress}, ${userAddress.city}, ${userAddress.pinCode}, ${userAddress.state}`
    );

    // Product Details
    doc.moveDown(1.2);
    doc.font(spartanMB).fontSize(18).text("Product Details:");
    doc.moveDown(0.2);

    order.product.forEach((product, index) => {
      doc.fontSize(12).text(`${index + 1}. Product: ${product.name}`);
      doc.text(`   Quantity: ${product.quantity}`);
      doc.text(`   Price per Unit: RS.${product.price}`);
      if(product.discountAmount > 0){
        doc.text(`  Discounted Price: RS.${product.discountAmount}`);
      }
      doc.text(`   Subtotal: RS.${product.price * product.quantity}`);
      doc.moveDown(0.4);
    });

    // Total Amount
    doc.moveDown(1.2);
    const totalAmount = order.product.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    
    doc.font(spartanMB).fontSize(14).text(`Total Amount: RS.${totalAmount}`, {
      align: "right",
    });

    doc.end();
    return res.status(200).end();
  } catch (err) {
    console.log(err);
  }
};
