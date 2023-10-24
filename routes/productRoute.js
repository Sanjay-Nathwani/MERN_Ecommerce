import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { braintreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFiltersController, productListController, productPhotoController, relatedProductsController, searchProductController, updateProductController } from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

// routes
// create product, method : post
router.post("/create-product",requireSignIn,isAdmin,formidable(),createProductController);

// get products, method : get
router.get("/get-products",getProductController);

// get single product ,method : get
router.get("/get-products/:slug",getSingleProductController);

// get photo, method : get
router.get("/product-photo/:pid", productPhotoController);

// delete product,method : delete
router.delete("/delete-product/:pid",deleteProductController);

// update product , method : put
router.put("/update-product/:pid",requireSignIn,isAdmin,formidable(),updateProductController);

// filter products,method : get
router.post("/product-filters",productFiltersController);

// product count, method : get
router.get("/product-count",productCountController);

// product per page, method : get
router.get("/product-list/:page",productListController);

// search product , method : get
router.get("/search/:keyword",searchProductController);

// similar product
router.get("/related-products/:pid/:cid",relatedProductsController);

// category wise roducts, method : get
router.get("/product-category/:slug",productCategoryController);

// payment routes
// token
router.get("/braintree/token",braintreeTokenController);

// payments
router.post("/braintree/payment",requireSignIn,braintreePaymentController);



export default router;