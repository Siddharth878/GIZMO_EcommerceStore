const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Users = require('../models/userModel');
const { findOne } = require('../models/userModel');
const sendEmail = require('../utils/email');
const crypto = require('crypto');
const cloudinary = require('cloudinary');




const createSendToken = (user,statusCode,res)=>{
    const token = user.getJWTToken();
    

    const options = {
        expires:"2d"
        httpOnly:true
    };

    res.status(statusCode).cookie('token',token,options).json({
        status:"success",
        token,
        data:{
            user
        }
    });

}








const filterObj = (obj,...allowedFields) =>{
    const newObj = {};

    Object.keys(obj).forEach(el=>{
        if(allowedFields.includes(el))
         newObj[el] = obj[el];
    })

    return newObj;

}











// Register a user
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
     
    // let myCloud = "acha";
   
    
    
    // const  myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
    //     folder:"avatars",
    //     width:150,
    //     crop:"scale",
    //     function(error, result) { console.log(result, error); }
    // })
    
    // console.log(myCloud);
    
    

    
    const {name,email,password,passwordConfirm} = req.body;
    // there fore admin  tum normal createuser se nahi bna skte (ya toh phir add kro yahn se feild)
    // otherwise seedha compass se edit kro (Security sakt)

    const user = await Users.create({
        name,
        email,
        password,
        passwordConfirm,
        // avatar:{
        //     public_Id:myCloud.public_id,
        //     url:myCloud.secure_url
        // }
    });


    createSendToken(user,201,res); // 201 matlab created Success

});









// Login The User
exports.login = catchAsyncErrors(async (req,res,next) =>{
    

    const {email,password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler('Please Provide email and password',400));
    }


    // The Actual Check

    const user = await Users.findOne({email}).select('+password'); // because select false he , isley we have to access it like this

    if(!user || !(await user.correctPassword(password)))
    {
        return next(new ErrorHandler('Incorrect Email or password',401));
    }


     createSendToken(user,200,res);


});









// Logout the user
exports.logout = catchAsyncErrors(async(req,res,next)=>{
      
   // this is because cookie nahi chl rha pta nhi kyun
    // req.headers.authorization = null;
    
    
    // cookies not working , therefore humne postman se hi null krdia 
    // jwt ko


    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    });

    


    res.status(200).json({
        success:true,
        message:"Logged Out"
    });
});











// Forgot Password
exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{
   
    
    // Get user based on posted email
    const user = await Users.findOne({email:req.body.email});
     
    if(!user){
        return next(new ErrorHandler('There is no User with this Email Address !',404));
    }



    //generate the random Reset token
    const resetToken = user.createPasswordResetToken();

    console.log(user.passwordResetToken,"forgot se");




    await user.save({validateBeforeSave:false});


    // send it to the User's email 
    // const resetUrl  = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;

    const resetUrl = `${req.protocol}://${req.get('host')}/login/resetPassword/${resetToken}`;



    const message = `Forgot Your password ? Sumbit a Patch request with your new password and Confirmed Password to : ${resetUrl}.\n If you did'nt forgot , then ignore this !`;



    try{
        await sendEmail({
            email:user.email,
            subject:'Your password Reset Token (valid for 10 min)',
            message
        });


        res.status(200).json({
            status:'Success',
            message:'Token sent to email'
        })
    }catch(err)
    {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        await user.save({validateBeforeSave:false});

        return next(new ErrorHandler("There was an error sending the email. Try Again later ",500));
    }

});













// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {


    // 1) Get user Based on the token
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  
  
    const user = await Users.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });

     

    console.log(hashedToken,'reset se');
  
    // 2) If token has not expired , and there is user , set the new password
    if (!user) {
      return next(new ErrorHandler('Token is invalid or has expired', 400))
    }
  
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    // why?? (niche walli undefined kyun)
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
  
  
    // 3)Update changedPasswordAt property for the user(MiddleWare se hoga woh)
  
    // 4) Log the User in , send JWT
    createSendToken(user,200,res);

  });













  
  // Get User Detail

  exports.getuserDetails = catchAsyncErrors(async(req,res,next)=>{

    const user = await Users.findById(req.user.id);

    
   

    res.status(200).json({
        success:true,
        user,
    });

  })














// Updating the Current Password (if Already logined user)
exports.updatePassword = catchAsyncErrors( async (req,res,next)=>{
   

    // Get user from Collection
    const user = await  Users.findById(req.user.id).select('+password');
 
 
    // Check if posted current password is correct
    if(await (!user.correctPassword(req.body.passwordCurrent,user.password))){
      return next(new AppError('Your current password is wrong . ',401)); 
    }
      
 
    // 3) If so , Update Password
    user.password = req.body.passwordNew;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
 
 
    // 4) Log user in , send JWT
     createSendToken(user,200,res);
 });














 // Updating the details of logged in user

 exports.updateMe = catchAsyncErrors(async(req,res,next)=>{

    if(req.body.password || req.body.passwordConfirm)
    {
        return next(new ErrorHandler("This route is not for Password update , Please user /updateMyPassword .",400));
    }

        

    // we will use Cloudinary for the pfp's later


    // Filter out Unwanted Field Names that are not allowed to be Updated
    const filteredBody = filterObj(req.body,'name','email');

    


    const updatedUser = await Users.findByIdAndUpdate(req.user.id,filteredBody,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        status:'success',
        data:{
            user:updatedUser
        }
    });

 })






 








// Admin -> get all users
 exports.getAllUsers = catchAsyncErrors( async (req,res,next)=>{
    
    const users = await Users.find()


    res.status(200).json({
        status: 'success',
        // requestedAt:req.requestTime,
        results: users.length,
        data: {
          users
        }
    });

});












// Admin -> Get a single user
exports.getSingleUser = catchAsyncErrors(async (req,res,next) =>{
   
         
         
       const user = await Users.findById(req.params.id);

       if(!user){
           return next(new ErrorHandler(`User with id : ${req.params.id} does not exist`,404));
       }


       res.status(200).json({
           success:true,
           user
       });
});


















// Update user -- ADMIN
exports.updateUser = catchAsyncErrors(async(req,res,next)=>{

    if(req.body.password || req.body.passwordConfirm)
    {
        return next(new ErrorHandler("This route is not for Password update , Please user /updateMyPassword .",400));
    }

        


    const filteredBody = filterObj(req.body,'name','email','role');


    const updatedUser = await Users.findByIdAndUpdate(req.params.id,filteredBody,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        status:'success',
        data:{
            user:updatedUser
        }
    });

 })








// Delete User -- ADMIN
 exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{

    
    const user = await Users.findById(req.params.id);

     if(!user)
     {
         return next(new ErrorHandler(`User Does Not exist with id : ${req.params.id}`,404));

     }

    // We will remove cloudinary (pfp)
    

    await Users.deleteOne(user);


    res.status(200).json({
        status:'success',
        message:"User Erased success"
    });

 })

