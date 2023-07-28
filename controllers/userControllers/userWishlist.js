const User = require("../../model/users");

exports.wishListGet = async (req, res) => {
  const user = await User.findOne({email: req.session.email});
  if (req.session.email && !user.isBlocked) {
    try {
      const existingUser = await User.findOne({
        email: req.session.email,
      }).populate("wishlist");
      const wishlistedProducts = existingUser.wishlist;
      res.render("wishlist", { loggedIn: true, wishlistedProducts });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.render("home", { loggedIn: false });
  }
};

exports.wishlistPost = async (req, res) => {
  if (req.session.email) {
    const productId = req.params.product_id;
    try {
      const user = await User.findOne({ email: req.session.email });
      if (!user) {
        res.render("login", { loggedIn: false });
      }

      if (!user.wishlist.includes(productId)) {
        user.wishlist.push(productId);
      }
      await user.save();
    } catch (err) {
      console.log(err);
    }
  } else {
    res.render("login", { loggedIn: false });
  }
};

exports.wishlistRemove = async (req, res) => {
  if (req.session.email) {
    const id = req.params.id;
    try {
      const user = await User.findOne({
        email: req.session.email,
      });
      if (user) {
        const index = user.wishlist.indexOf(id);
        if (index > -1) {
          user.wishlist.splice(index, 1);
          await user.save();
          return res.status(200).end();
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
};
