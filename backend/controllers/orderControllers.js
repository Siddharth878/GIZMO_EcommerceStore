const User = require('../models/userModel');
const Order = require('../models/orderModel');



const Products = require('../models/productModel');


const express = require('express');


const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ApiFeatures = require('../utils/ApiFeatures');







// Create new Order
exports.newOrder = catchAsyncErrors(async (req,res,next)=>{
   

    
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;
     
    // console.log(req.body);

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id,
    });

    // console.log("bangya");
    
    

    res.status(201).json({
        success:true,
        order
    })
});


















// Get Single Order
// orderId  se order niklna 

exports.getSingleOrder = catchAsyncErrors(async (req,res,next)=>{
    
   
    const order = await Order.findById(req.params.id).populate({path:"user",
     select:'name email'});
    // populate -> will search in user datebase for the name and email of that _id
    // or order meh name and email bhi mention hoejaga


    if(!order){
        return next(new ErrorHandler('Order not found with this id',404));
    }


    res.status(200).json({
        success:true,
        order,
    });

});




















// Get logged in User Orders

exports.myOrders = catchAsyncErrors(async (req,res,next)=>{

    

    // doubt _id and id both working
    const orders = await Order.find({user:req.user._id});





    res.status(200).json({
        success:true,
        orders,
    });

});



















// Get all orders -- admin
exports.getAllOrders = catchAsyncErrors(async (req,res,next)=>{

    const orders = await Order.find();
    

    // 
    let totalAmount = 0;
    orders.forEach(order=>{
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success:true,
        totalAmount,
        orders
    });

});

















// Update order Status -- (admin)     -- Sabse imp in orders Api

exports.updateOrder = catchAsyncErrors(async (req,res,next)=>{

    const order = await Order.findById(req.params.id);
    

    if(!order){
        return next(new ErrorHandler('Order not found with this id',404));
    }



    if(order.orderStatus=="Delivered"){
        return next(new ErrorHandler("You have already delivered this order",400));
    }

    order.orderItems.forEach(async (o)=>{
        await updateStock(o.Product,o.quantity);
    });

    order.orderStatus = req.body.status;

    if(req.body.status==="Delivered"){
        order.deliveredAt = Date.now();
    }
    

    await order.save({validateBeforeSave:false});


    res.status(200).json({
        success:true,
    });

});

async function updateStock(id,quantity){
    const product = await Products.findById(id);
    product.Stock -= quantity;

    // Note Ekk baar or test krna for Stock 

    await product.save({validateBeforeSave:false});
}















// Delete Order -- admin

exports.deleteOrder = catchAsyncErrors(async (req,res,next)=>{

    const order = await Order.findById(req.params.id);
    

    if(!order){
        return next(new ErrorHandler('Order not found with this id',404));
    }

    // await order.remove(); is not a function (depricated ho gya)

   await Order.findByIdAndDelete(req.params.id);

  
    res.status(200).json({
        success:true,
    });

});


