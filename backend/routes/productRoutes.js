const express = require('express');
const router = express.Router();
const {uploadProductController, allProductsController, updateProductController, deleteProductController} = require('../controller/productController')

// upload product || POST
router.post('/upload', uploadProductController);

// get all poroduct
router.get('/all-products', allProductsController);

// update single product
router.post('/update/:id', updateProductController);

// delete single product
router.delete('/delete/:id', deleteProductController)

module.exports = router;