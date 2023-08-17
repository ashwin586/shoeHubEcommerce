const express = require("express");
const userRouter = express.Router();
const userHomeGet = require("../controllers/userControllers/usersView.js");
const userLogin = require("../controllers/userControllers/userLogin.js");
const userAccountDetails = require("../controllers/userControllers/userAccountDetails.js");
const userRegister = require("../controllers/userControllers/userRegister.js");
const userLogout = require("../controllers/userControllers/userLogout.js");
const userForgotPassword = require("../controllers/userControllers/userForgotPassword.js");
const userProductView = require("../controllers/userControllers/userProducts.js");
const userWishlist = require("../controllers/userControllers/userWishlist.js");
const userCart = require("../controllers/userControllers/userCart.js");
const userCheckout = require("../controllers/userControllers/userCheckout.js");
const userAddress = require("../controllers/userControllers/userAddress.js");
const userOrders = require("../controllers/userControllers/userOrders.js");
const userOrderSuccess = require("../controllers/userControllers/userOrderSuccess.js");
const userOrderInvoice = require('../controllers/userControllers/userOrderInvoice.js');
const userHeaderMiddleware = require("../middleware/userHeader.js");
const userAuth = require("../middleware/userAuth.js");

const { isLogged, blockCheck, isUser } = userAuth;

////////////////////////////////////////////// USER AUTH AND FUNCTIONS /////////////////////////////////////
userRouter.get("/", isLogged, userHeaderMiddleware, userHomeGet.home);
userRouter.get('/logout', userLogout.userBlockLogoutGet);
userRouter.get("/login", userHeaderMiddleware, userLogin.loginGet);
userRouter.get("/register", userHeaderMiddleware, userRegister.signinGet);
userRouter.get("/user_otp", userHeaderMiddleware, userRegister.userOtpGet);
userRouter.get("/user_logout", userHeaderMiddleware, userLogout.userLogoutGet);
userRouter.get("/user_email_verifyGet", userHeaderMiddleware, userForgotPassword.verifyEmailGet);
userRouter.get("/user_otp_verifyGet", userHeaderMiddleware, userForgotPassword.verifyOtpGet );
userRouter.get("/user_confirm_passwordGet", userHeaderMiddleware, userForgotPassword.confirmPasswordGet );
userRouter.post("/register", userHeaderMiddleware, userRegister.siginPost);
userRouter.post("/login", userHeaderMiddleware, userLogin.loginPost);
userRouter.post("/user_otp", userHeaderMiddleware, userRegister.userotpPost);
userRouter.post("/user_email_verifyPost", userHeaderMiddleware, userForgotPassword.verifyEmailPost );
userRouter.post("/user_otp_verifyPost", userHeaderMiddleware, userForgotPassword.verifyOtpPost );
userRouter.post("/user_confirm_passwordPost", userHeaderMiddleware, userForgotPassword.confirmPasswordPost );
userRouter.post("/resend_otp_post", userHeaderMiddleware, userForgotPassword.resendOtp );


///////////////////////////////////////////// USER PRODUCT BASED FUNCTIONS ////////////////////////////////////
userRouter.get("/user_product_view_get", isLogged, userHeaderMiddleware, userProductView.userProductsViewGet );
userRouter.get("/user_category_product_view_get", isLogged, userHeaderMiddleware, userProductView.userCategoryProductViewGet );
userRouter.get("/user_product_details_get/:product_id", isLogged, userHeaderMiddleware, userProductView.userProductDetailsGet );
userRouter.post("/user_filter_category_post/:categoryid", isLogged, userHeaderMiddleware, userProductView.userFilterCategory );


///////////////////////////////////////////// USER CART AND WISHLIST BASED FUNCTIONS //////////////////////////////
userRouter.get("/user_wishlist_get", userHeaderMiddleware, isLogged, userWishlist.wishListGet );
userRouter.get("/user_cart_get", userHeaderMiddleware, isLogged, userCart.userCartGet);
userRouter.post("/user_wishlist_post/:product_id", isUser, userHeaderMiddleware, userWishlist.wishlistPost );
userRouter.post("/user_wishlist_remove/:id", isUser, userHeaderMiddleware, userWishlist.wishlistRemove );
userRouter.post("/user_add_to_cart_post/:productid/:quantity", isUser, blockCheck, userHeaderMiddleware, userCart.userCartPost );
userRouter.post("/user_cart_remove/:id", isUser, userHeaderMiddleware, blockCheck, userCart.userCartRemovePost );
userRouter.post("/user_cart_quantity_update", isUser, userHeaderMiddleware, blockCheck, userCart.userCartQuantityUpdate );


//////////////////////////////////////////// USER PROFILE BASED FUNCTIONS /////////////////////////////////////////
userRouter.get("/user_account_details_get", userHeaderMiddleware, isLogged, userAccountDetails.userAccountDeatailsGet );
userRouter.post("/user_address_post", isUser, userHeaderMiddleware, blockCheck, userAddress.userAddressPost );
userRouter.post("/user_address_remove_post", isUser, userHeaderMiddleware, blockCheck, userAddress.userAddressRemovePost );
userRouter.post("/user_account_edit_post", isUser, userHeaderMiddleware, blockCheck, userAccountDetails.userAccountDetailsEditPost );


///////////////////////////////////////////// USER ORDER BASED FUNCTIONS ///////////////////////////////////////////
userRouter.get("/user_checkout_get", isLogged, userHeaderMiddleware, userCheckout.userCheckOutGet );
userRouter.get("/user_order_success_get", userHeaderMiddleware, isLogged, userOrderSuccess.userOrderSuccessGet );
userRouter.get("/user_order_history_get", userHeaderMiddleware, isLogged, userOrders.userOrderHistoryGet );
userRouter.get("/user_order_details_get",userHeaderMiddleware, isLogged, userOrders.userOrderDetailsGet );
userRouter.post("/user_checkout_post", isUser, userHeaderMiddleware, blockCheck, userCheckout.userCheckOutPost );
userRouter.post("/user_order_cancel", isUser, userHeaderMiddleware, blockCheck, userOrders.userOrderCancel );
userRouter.post("/user_order_returned", isUser, userHeaderMiddleware, blockCheck, userOrders.userOrderReturn );
userRouter.post("/user_coupon_check", isUser, userHeaderMiddleware, blockCheck, userCheckout.userCouponCheck );
userRouter.post('/user_order_invoice', isUser, userHeaderMiddleware, blockCheck, userOrderInvoice.userOrderInvoice);


module.exports = userRouter;
