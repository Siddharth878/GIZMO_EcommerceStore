const express = require('express');
const Products = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ApiFeatures = require('../utils/ApiFeatures');

// Create Product  -- Admin only
exports.createProduct = catchAsyncErrors(async (req, res, next) => {


  // To Know who made this 

  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  
  res.status(201).json({
    success: true,
    product
  });
});



// Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {

  const productCount = await Products.countDocuments();  
  const resultPerPage = 6;

  const features = new ApiFeatures(Products.find(), req.query).search().filter();
  
  let products = await features.query;
 


  const filteredProductsCount = products.length;

  features.paginate(resultPerPage);


  products = await features.query.clone();

  res.status(200).json({
    message: "Success",
    products,
    productCount,
    resultPerPage,
    filteredProductsCount
  });

});





// Update Product --> Admin
exports.updateProducts = catchAsyncErrors(async (req, res, next) => {

  let product = await Products.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler('Product Not Found', 404));
  }

  product = await Products.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    message: "Success",
    data: {
      product
    }
  })

});





// Delete Product -- Admin
exports.deleteProducts = catchAsyncErrors(async (req, res, next) => {


  const product = await Products.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler('Product Not Found', 404));
  }

  await Products.findByIdAndDelete(req.params.id);


  // 204 -> don not navigate from the current page
  res.status(204).json({
    Status: "Success",
    message: "Product deleted SuccessFully"
  });


});










// Get Product Details 
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {

  const product = await Products.findById(req.params.id);
  if (!product) { // using error handling middleware here thereform manually jarurat nhi
    return next(new ErrorHandler('Product Not Found', 404));
  }

  res.status(200).json({
    status: 'Product Found',
    product
  })

});













// Try testing this route with multiple users of same pro -> review (kyunki test nahi kra krke)
// Create Product Review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

  const { rating, comment, productId } = req.body;

   
  

  const review = {
    user : req.user._id,
    name : req.user.name,
    rating : Number(rating),
    comment,
  };
  

  const product = await Products.findById(productId);
  

   const isReviewed = product.reviews.find(
     (rev)=>rev.user.toString()===req.user._id.toString()
   );

   if(isReviewed) // if Already reviewed than update that review By that Particular User
   {
      product.reviews.forEach(rev=>{
          if(rev.user.toString() == req.user._id.toString()){
           (rev.rating = rating);
           rev.comment = comment
          }
      })

   }else{

    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
   }

   
   
   // Now for that overall Rating
   
   let avg = 0;
   
   product.reviews.forEach((rev)=>{
     avg+=rev.rating;
    });
    
    product.ratings = avg/product.reviews.length;
    
    
    await product.save({ validateBeforeSave: false });
    
    

   res.status(200).json({
     success:true
   });

});









// Get all reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req,res,next) =>{
     

  const product = await Products.findById(req.query.productId);

  if(!product){
    return next(new ErrorHandler('Product Not Found', 404));
  }


  let message = "Here are the reviews";

  if(!product.reviews.length)
   message = "No reviews for this Product";

  res.status(200).json({
    success:true,
    message,
    reviews:product.reviews
  });
});




// Delete all the reviews of the single products
exports.deleteReview = catchAsyncErrors(async (req,res,next) =>{
     

  const product = await Products.findById(req.query.productId);

  if(!product){
    return next(new ErrorHandler('Product Not Found', 404));
  }


  const reviews = product.reviews.filter( rev=>rev._id.toString()!=req.query.id.toString())
  

  
  let avg = 0;

  reviews.forEach((rev)=>{
    avg+=rev.rating;
  });
 
   

  let ratings = 0;
  
  if(avg) // ie.. if the product has no reviews then Undefined hojega na isley 
    ratings = avg/reviews.length;


  const numOfReviews = reviews.length;

  await Products.findByIdAndUpdate(req.query.productId,{
    reviews,
    ratings,
    numOfReviews
  },{
    new:true,
    runValidators:true,
    useFindAndModify:false
  });


  

  res.status(200).json({
    success:true,
  });
   
});