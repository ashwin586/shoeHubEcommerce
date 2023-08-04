const express = require("express");
const adminRouter = express.Router();
const upload = require("../middleware/multer");
const adminView = require("../controllers/adminControllers/adminView");
const adminAuth = require("../controllers/adminControllers/adminAuth");
const adminUsersManagment = require("../controllers/adminControllers/adminUsersManagment");
const adminProductManagment = require("../controllers/adminControllers/adminProductManagment");
const adminCategoryManagment = require("../controllers/adminControllers/adminCategoryManagment");
const adminOrderManagment = require("../controllers/adminControllers/adminOrderManagment");
const adminCouponManagment = require("../controllers/adminControllers/adminCouponManagment");

////////////ADMIN GET METHODS/////////////////////
adminRouter.get("/admin", adminView.adminDashboard);
adminRouter.get("/admin_login", adminAuth.adminLoginGet);
adminRouter.get("/admin_logout", adminAuth.adminLogoutGet);

adminRouter.get(
  "/admin_users_managment",
  adminUsersManagment.adminUserManagmentGet
);
adminRouter.post("/user_block/:userId", adminUsersManagment.userBlock);
adminRouter.post("/user_unblock/:userId", adminUsersManagment.userUnblock);

adminRouter.get(
  "/admin_product_add_get",
  adminProductManagment.adminProductAddGet
);
adminRouter.get(
  "/admin_product_view_get",
  adminProductManagment.adminProductViewGet
);
adminRouter.get(
  "/admin_product_edit_get/:product_id",
  adminProductManagment.adminProductEditGet
);

adminRouter.get(
  "/admin_category_view_get",
  adminCategoryManagment.admincategoryViewGet
);
adminRouter.get(
  "/admin_category_add_get",
  adminCategoryManagment.adminCategoryAddGet
);
adminRouter.get(
  "/admin_category_edit_get/:category_id",
  adminCategoryManagment.adminCategoryEditGet
);
adminRouter.get(
  "/admin_orders_view_get",
  adminOrderManagment.adminOrderViewGet
);

adminRouter.get("/admin_coupon_view_get", adminCouponManagment.adminCouponView);
adminRouter.get(
  "/admin_coupon_add_get",
  adminCouponManagment.adminCouponAddView
);

////////////ADMIn POST METHODS/////////////////////////
adminRouter.post("/admin_login", adminAuth.adminLoginPost);

adminRouter.post(
  "/admin_product_add_post",
  upload.array("image", 4),
  adminProductManagment.adminProductAddPost
);

adminRouter.post(
  "/admin_product_edit_post/:product_id",
  upload.array("image", 5),
  adminProductManagment.adminProductEditPost
);

// adminRouter.post(
//   "/admin_product_image/id",
//   adminProductManagment.adminproductImageAlterPost
// );

adminRouter.post(
  "/admin_category_add_post",
  upload.single("image"),
  adminCategoryManagment.adminCategoryAddPost
);

adminRouter.post(
  "/admin_category_edit_post/:category_id",
  upload.single("image"),
  adminCategoryManagment.adminCategoryEditPost
);

adminRouter.post(
  "/admin_delete_image_post/:id",
  adminProductManagment.adminImageDeletePost
);

adminRouter.post(
  "/admin_order_status_post",
  adminOrderManagment.adminOrderStatusPost
);

adminRouter.post(
  "/admin_coupon_add_post",
  adminCouponManagment.admincouponAddPost
);

module.exports = adminRouter;
