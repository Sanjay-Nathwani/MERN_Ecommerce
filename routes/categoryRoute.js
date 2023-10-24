import express from "express";
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from "../controllers/categoryController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// routes
// create category,method : post
router.post("/create-category",requireSignIn,isAdmin,createCategoryController);

// update category, method : put
router.put("/update-category/:id",requireSignIn,isAdmin,updateCategoryController);

//get all categories, method : get
router.get("/all-categories",categoryController); 

// get single category, method : get
router.get("/single-category/:slug",singleCategoryController);

// delete category , method : delete
router.delete("/delete-category/:id",requireSignIn,isAdmin,deleteCategoryController);



export default router;