const express = require("express");
const userRouter = express.Router();
const userHomeGet = require("../controllers/userControllers/usersView.js");
const userLogin = require("../controllers/userControllers/userLogin.js");
const userRegister = require("../controllers/userControllers/userRegister.js");
const userLogout = require("../controllers/userControllers/userLogout.js");
const userForgotPassword = require('../controllers/userControllers/userForgotPassword.js');
const userProductView = require("../controllers/userControllers/userProducts.js");
const userHeaderMiddleware = require('../middleware/userHeader.js');

userRouter.get("/", userHomeGet.home);
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



userRouter.post("/register",userHeaderMiddleware, userRegister.siginPost);
userRouter.post("/login",userHeaderMiddleware, userLogin.loginPost);
userRouter.post("/user_otp",userHeaderMiddleware, userRegister.userotpPost);
userRouter.post('/user_email_verifyPost',userHeaderMiddleware, userForgotPassword.verifyEmailPost)
userRouter.post('/user_otp_verifyPost',userHeaderMiddleware, userForgotPassword.verifyOtpPost);
userRouter.post('/user_confirm_passwordPost',userHeaderMiddleware, userForgotPassword.confirmPasswordPost);
userRouter.post('/resend_otp_post', userHeaderMiddleware, userForgotPassword.resendOtp);

module.exports = userRouter;
