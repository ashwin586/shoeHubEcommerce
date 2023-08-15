const express = require("express");
const adminRouter = express.Router();
const isAdmin = require("../middleware/adminCheck");
const upload = require("../middleware/multer");
const adminView = require("../controllers/adminControllers/adminView");
const adminAuth = require("../controllers/adminControllers/adminAuth");
const adminUsersManagment = require("../controllers/adminControllers/adminUsersManagment");
const adminProductManagment = require("../controllers/adminControllers/adminProductManagment");
const adminCategoryManagment = require("../controllers/adminControllers/adminCategoryManagment");
const adminOrderManagment = require("../controllers/adminControllers/adminOrderManagment");
const adminCouponManagment = require("../controllers/adminControllers/adminCouponManagment");
const adminBannerManagment = require("../controllers/adminControllers/adminBannerManagment");
const adminSalesReport = require("../controllers/adminControllers/salesReport");


//////////////////////////////////////////// ADMIN DASHBOARD MANAGMENT ///////////////////////////////////////////
adminRouter.get("/admin", isAdmin, adminView.adminDashboard);
adminRouter.get("/admin_chart", isAdmin, adminView.adminChart);
adminRouter.get("/admin_login", isAdmin, adminAuth.adminLoginGet);
adminRouter.get("/admin_logout", isAdmin, adminAuth.adminLogoutGet);
adminRouter.post("/admin_login", adminAuth.adminLoginPost);
adminRouter.post("/admin_salesReport", adminSalesReport.adminSalesReportpost);


///////////////////////////////////////////// ADMIN USER MANAGMENT //////////////////////////////////////////////
adminRouter.get("/admin_users_managment", isAdmin, adminUsersManagment.adminUserManagmentGet );
adminRouter.post("/user_block/:userId", isAdmin, adminUsersManagment.userBlock );
adminRouter.post("/user_unblock/:userId",isAdmin, adminUsersManagment.userUnblock );


////////////////////////////////////////////// ADMIN PRODUCT MANAGMENT /////////////////////////////////////////
adminRouter.get("/admin_product_add_get", isAdmin, adminProductManagment.adminProductAddGet );
adminRouter.get("/admin_product_view_get", isAdmin, adminProductManagment.adminProductViewGet );
adminRouter.get("/admin_product_edit_get/:product_id", isAdmin, adminProductManagment.adminProductEditGet );
adminRouter.post("/admin_product_add_post", isAdmin, upload.array("image", 4), adminProductManagment.adminProductAddPost );
adminRouter.post("/admin_product_edit_post/:product_id", isAdmin, upload.array("image", 5), adminProductManagment.adminProductEditPost );
adminRouter.post("/admin_delete_image_post/:id", isAdmin, adminProductManagment.adminImageDeletePost );
adminRouter.post('/admin_product_unList', isAdmin, adminProductManagment.adminProductunlist );
adminRouter.post('/admin_product_list', isAdmin, adminProductManagment.adminProductList);



///////////////////////////////////////////////// ADMIN CATEGORY MANAGMENT //////////////////////////////////////////
adminRouter.get("/admin_category_view_get", isAdmin, adminCategoryManagment.admincategoryViewGet );
adminRouter.get("/admin_category_add_get", isAdmin, adminCategoryManagment.adminCategoryAddGet );
adminRouter.get("/admin_category_edit_get/:category_id", isAdmin, adminCategoryManagment.adminCategoryEditGet );
adminRouter.post("/admin_category_add_post", isAdmin, upload.single("image"), adminCategoryManagment.adminCategoryAddPost );
adminRouter.post("/admin_category_edit_post/:category_id", isAdmin, upload.single("image"), adminCategoryManagment.adminCategoryEditPost );
adminRouter.post('/admin_category_unlist', isAdmin, adminCategoryManagment.adminCategoryUnList);
adminRouter.post('/admin_category_list', isAdmin, adminCategoryManagment.adminCategoryList);


/////////////////////////////////////////////// ADMIN ORDER MANAGMENT ////////////////////////////////////////
adminRouter.get("/admin_orders_view_get", isAdmin, adminOrderManagment.adminOrderViewGet );
adminRouter.post("/admin_order_status_post", isAdmin, adminOrderManagment.adminOrderStatusPost );


///////////////////////////////////////////////// ADMIN COUPON MANAGMENT //////////////////////////////////
adminRouter.get("/admin_coupon_view_get", isAdmin, adminCouponManagment.adminCouponView );
adminRouter.get("/admin_coupon_add_get", isAdmin, adminCouponManagment.adminCouponAddView );
adminRouter.post("/admin_coupon_add_post", isAdmin,adminCouponManagment.admincouponAddPost );


///////////////////////////////////////////////// ADMIN BANNER MANAGMENT ////////////////////////////////////
adminRouter.get("/admin_banner_view_get", isAdmin, adminBannerManagment.adminBannerView );
adminRouter.get("/admin_banner_add_get", isAdmin, adminBannerManagment.adminAddBannerGet );
adminRouter.get("/admin_banner_edit_get", isAdmin, adminBannerManagment.adminEditBannerGet );
adminRouter.post("/admin_banner_add_post", isAdmin, upload.single("image"),adminBannerManagment.adminAddBannerPost );
adminRouter.post("/admin_banner_edit_post", isAdmin, upload.single("image"),adminBannerManagment.adminEditBannerPost );
adminRouter.post("/admin_banner_/:action", isAdmin, adminBannerManagment.adminBannerAlterPost );


module.exports = adminRouter;
