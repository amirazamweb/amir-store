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

module.exports = {uploadProductController, allProductsController, updateProductController, deleteProductController}
