const productModel = require('../models/productModel');
const ProductModel = require('../models/productModel');

// upload product
const uploadProductController = async(req, res)=>{
    try {
        const uploadProduct = new ProductModel(req.body);
        uploadProduct.save();

        res.send({
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


// updateProductController
const updateProductController = async(req, res)=>{
       try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.send({
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
        res.send({
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

    res.send({
        success:true,
        message:'Product list by page number',
        paginatedProductList
    })
    
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


// single product from each category
const categoryListcontroller = async(req, res)=>{
    try {
     const categories = await ProductModel.distinct('category');
      const products = [];

      for(const category of categories){
         const singleProduct = await ProductModel.findOne({category});
         products.push(singleProduct);
      }

      res.send({
        success:true,
        message: 'Single product from each category',
        products
      })
      
    } catch (error) {
        res.send({
            success:false,
            message:'Error while getting singlr product from each category'
        })
        console.log(error);
    }
}

// productCategoryHandler
const productCategoryHandler = async(req, res)=>{
    try {
       const {category} = req.params;
        const products = await ProductModel.find({category});
        res.send({
            success:true,
            products
        })
    } catch (error) {
        res.send({
            success:false,
            message:'Error while getting product category'
        })
        console.log(error);
    }
}

// singleProductHandler
const singleProductHandler = async(req, res)=>{
    try {
        const productDetails = await productModel.findById(req.params.id);
        res.send({
            success:true,
            message: 'Single product details',
            productDetails
        })
    } catch (error) {
        res.send({
            success:false,
            message:'Error while getting single product'
        })
        console.log(error);
    }
}

module.exports = {uploadProductController, updateProductController, deleteProductController, totalProductCountController, productPaginationHandler, productCountByCategoryController, categoryListcontroller, productCategoryHandler, singleProductHandler}
