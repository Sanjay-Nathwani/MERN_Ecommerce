import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} from "../controllers/authController.js";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// router object
const router = express.Router();

/* -------------routing---------------*/
// Register , method = post
router.post("/register", registerController);

// Login, method = post
router.post("/login",loginController);

// Forgot password ,method = post
router.post("/forgot-password",forgotPasswordController);

// test routes
router.get("/test",requireSignIn,isAdmin,testController);

// protected route path for user
router.get("/user-auth",requireSignIn,(req,res)=>{
  res.status(200).send({ok : true});
})

// protected route path for admin
router.get("/admin-auth",requireSignIn,isAdmin,(req,res)=>{
  res.status(200).send({ok : true});
})

// update profile
router.put("/profile",requireSignIn,updateProfileController);

// orders
router.get("/orders",requireSignIn,getOrdersController);

// all orders admin
router.get("/all-orders",requireSignIn,isAdmin,getAllOrdersController);

// order status update
router.put("/order-status/:orderId",requireSignIn,isAdmin,orderStatusController);

export default router;