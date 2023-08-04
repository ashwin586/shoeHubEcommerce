const express = require("express");
const userRouter = express.Router();
const userHomeGet = require("../controllers/userControllers/usersView.js");
const userLogin = require("../controllers/userControllers/userLogin.js");
const userAccountDetails = require("../controllers/userControllers/userAccountDetails.js")
const userRegister = require("../controllers/userControllers/userRegister.js");
const userLogout = require("../controllers/userControllers/userLogout.js");
const userForgotPassword = require('../controllers/userControllers/userForgotPassword.js');
const userProductView = require("../controllers/userControllers/userProducts.js");
const userWishlist = require("../controllers/userControllers/userWishlist.js");
const userCart = require("../controllers/userControllers/userCart.js");
const userCheckout = require("../controllers/userControllers/userCheckout.js");
const userAddress = require('../controllers/userControllers/userAddress.js');
const userOrders = require("../controllers/userControllers/userOrders.js");
const userOrderSuccess = require('../controllers/userControllers/userOrderSuccess.js');
const userHeaderMiddleware = require('../middleware/userHeader.js');


userRouter.get("/", userHeaderMiddleware, userHomeGet.home);
userRouter.get("/login", userHeaderMiddleware, userLogin.loginGet);
userRouter.get("/register", userHeaderMiddleware, userRegister.signinGet);
userRouter.get("/user_otp", userHeaderMiddleware, userRegister.userOtpGet);
userRouter.get("/user_logout", userHeaderMiddleware, userLogout.userLogoutGet);
userRouter.get('/user_email_verifyGet', userHeaderMiddleware, userForgotPassword.verifyEmailGet);
userRouter.get('/user_otp_verifyGet', userHeaderMiddleware, userForgotPassword.verifyOtpGet);
userRouter.get('/user_confirm_passwordGet', userHeaderMiddleware, userForgotPassword.confirmPasswordGet);
userRouter.get('/user_product_view_get', userHeaderMiddleware, userProductView.userProductsViewGet);
userRouter.get('/user_category_product_view_get', userHeaderMiddleware, userProductView.userCategoryProductViewGet);
userRouter.get('/user_product_details_get/:product_id', userHeaderMiddleware, userProductView.userProductDetailsGet);
userRouter.get('/user_wishlist_get', userHeaderMiddleware, userWishlist.wishListGet);
userRouter.get('/user_cart_get',userHeaderMiddleware, userCart.userCartGet);
userRouter.get('/user_checkout_get', userHeaderMiddleware, userCheckout.userCheckOutGet);
userRouter.get('/user_account_details_get', userHeaderMiddleware, userAccountDetails.userAccountDeatailsGet);
userRouter.get('/user_order_success_get', userHeaderMiddleware, userOrderSuccess.userOrderSuccessGet);
userRouter.get('/user_order_history_get', userHeaderMiddleware, userOrders.userOrderHistoryGet);
userRouter.get('/user_order_details_get', userHeaderMiddleware, userOrders.userOrderDetailsGet);



userRouter.post("/register",userHeaderMiddleware, userRegister.siginPost);
userRouter.post("/login",userHeaderMiddleware, userLogin.loginPost);
userRouter.post("/user_otp",userHeaderMiddleware, userRegister.userotpPost);
userRouter.post('/user_email_verifyPost',userHeaderMiddleware, userForgotPassword.verifyEmailPost)
userRouter.post('/user_otp_verifyPost',userHeaderMiddleware, userForgotPassword.verifyOtpPost);
userRouter.post('/user_confirm_passwordPost',userHeaderMiddleware, userForgotPassword.confirmPasswordPost);
userRouter.post('/resend_otp_post', userHeaderMiddleware, userForgotPassword.resendOtp);
userRouter.post('/user_wishlist_post/:product_id', userHeaderMiddleware, userWishlist.wishlistPost);
userRouter.post('/user_add_to_cart_post/:productid/:quantity', userHeaderMiddleware, userCart.userCartPost);
userRouter.post('/user_wishlist_remove/:id', userHeaderMiddleware, userWishlist.wishlistRemove);
userRouter.post('/user_cart_remove/:id', userHeaderMiddleware, userCart.userCartRemovePost);
userRouter.post('/user_filter_category_post/:categoryid', userHeaderMiddleware, userProductView.userFilterCategory)
userRouter.post('/user_address_post', userHeaderMiddleware, userAddress.userAddressPost);
userRouter.post('/user_address_remove_post', userHeaderMiddleware, userAddress.userAddressRemovePost);
userRouter.post('/user_checkout_post', userHeaderMiddleware, userCheckout.userCheckOutPost);
userRouter.post('/user_account_edit_post', userHeaderMiddleware, userAccountDetails.userAccountDetailsEditPost);
userRouter.post('/user_cart_quantity_update', userHeaderMiddleware, userCart.userCartQuantityUpdate);
userRouter.post('/user_order_cancel', userHeaderMiddleware, userOrders.userOrderCancel);
userRouter.post('/user_order_returned', userHeaderMiddleware, userOrders.userOrderReturn);
userRouter.post('/user_coupon_check', userHeaderMiddleware, userCheckout.userCouponCheck);


module.exports = userRouter;
