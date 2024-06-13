const productModel = require('../models/productModel');
const ProductModel = require('../models/productModel');

// upload product
const uploadProductController = async(req, res)=>{
    try {
        const uploadProduct = new ProductModel(req.body);
        uploadProduct.save();

        res.status(201).send({
            success:true,
            message:'Product upload successfully',
            data:uploadProduct
        })
        
    } catch (error) {
        console.log(error);
        res.send({
            success:false,
            message:'Error whileuploading product'
        })
    }
}


// all product
const allProductsController = async(req, res)=>{
    try {
     const allProducts = await ProductModel.find().sort({createdAt:-1});
      res.json(allProducts);
    } catch (error) {
        res.send({
            success:false,
            message:'Error while getting all products'
        })
        console.log(error);
    }
}


// updateProductController
const updateProductController = async(req, res)=>{
       try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.status(200).send({
            success:true,
            message:'Product updated successfully!',
            updatedProduct
        })
       } catch (error) {
        res.send({
            success:false,
            message:'Error while updating the product'
        })
        console.log(error);
       }
}

// deleteProductController
const deleteProductController = async(req, res)=>{
      try {
        const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);
        res.status(200).send({
            success:true,
            message:'Product deleted successfully!'
        })
      } catch (error) {
        res.send({
            success:false,
            message:'Error while deleteing the product'
        })
        console.log(error);
      }
}

// totalProductCountController
const totalProductCountController = async(req, res)=>{
    try {
        const toatalProductCount = await ProductModel.find({}).estimatedDocumentCount();
        res.send({
            success:true,
            toatalProductCount
        });
    } catch (error) {
        res.send({
            success:false,
            message:'Error while getting product count'
        })
        console.log(error);
    }
}

// pagination
const productPaginationHandler = async(req, res)=>{
    const {paginationCategory, paginationPageNumber} = req.body;
    const numberOfSkipProduct = (paginationPageNumber-1)*12;
    let productCategory = {category:''}
    if(paginationCategory==='all'){
        productCategory = {}
    }

    else{
     productCategory = {category:paginationCategory}
    }

    const paginatedProductList = await productModel.find(productCategory).skip(numberOfSkipProduct).limit(12).sort({createdAt:-1});

    res.json(paginatedProductList)
    
    try {
        
    } catch (error) {
        res.send({
            success:false,
            message:'Error while paginating product'
        })
        console.log(error);
    }
}

// productCountByCategoryController
const productCountByCategoryController = async(req,res)=>{
    try {
        let productCategory = {category:''}
    if(req.params.category==='all'){
        productCategory = {}
    }
    else{
     productCategory = {category:req.params.category}
    }
    const toatalProduct = await ProductModel.find(productCategory);
    res.send({
        success:true,
        toatalProduct:toatalProduct.length
    });
    } catch (error) {
        
    }
}

module.exports = {uploadProductController, allProductsController, updateProductController, deleteProductController, totalProductCountController, productPaginationHandler, productCountByCategoryController}
