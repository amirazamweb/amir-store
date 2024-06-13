const express = require('express');
const router = express.Router();
const {uploadProductController, allProductsController, updateProductController, deleteProductController, totalProductCountController, productPaginationHandler, productCountByCategoryController} = require('../controller/productController')

// upload product || POST
router.post('/upload', uploadProductController);

// get all poroduct
router.get('/all-products', allProductsController);

// update single product
router.post('/update/:id', updateProductController);

// delete single product
router.delete('/delete/:id', deleteProductController)

// get total product count
router.get('/total-product-count', totalProductCountController);

// added new route
// product pagination
router.post('/pagination', productPaginationHandler);

// product count by category
router.post('/product-count/:category', productCountByCategoryController)

module.exports = router;