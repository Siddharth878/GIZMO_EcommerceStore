const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');
const Users = require('../models/userModel');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');



// req.cookies not working bhai 

exports.protect = catchAsyncErrors( async (req,res,next) =>{
    

    let token = "";
    // because cookies is not working , Thereby use Bearer token via Postman -- 
    // update , the token is working in browser so ->> 
    // update abb krena lga work dono meh (postman and browser)

    token = req.cookies.token;


    




    // if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    //     token = req.headers.authorization.split(' ')[1];
    // }

    if(!token)
     return next(new ErrorHandler('You are not logged in ! Please log in'));

    
     // Verification Token

     const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET)
    

     const currentUser = await Users.findById(decoded.id);


     

     if(!currentUser)
     {
         return next(
             new ErrorHandler(
                 'The User belonging to this token does no longer exist. ',
                 401
             )
         );
     }


    //  if(currentUser.changedPasswordAfter(decoded.iat)){
    //      return next(new Errorhandler('User recently changed the password ! Please log in again .',401));
    //  }
     

     // Grant Access
     req.user = currentUser;
     next();


});

exports.authorizedRole = (...roles) =>{
    

    
    return (req,res,next)=>{
        
        if(!roles.includes(req.user.role)){
            
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed to access this resource`,403)); //server refused

        }

        next();
    }
}