const ErrorHandler = require('../utils/errorHandler');

// this is the global error Handling middleware we learnt in error Handling in nodejs

module.exports = (err,req,res,next) =>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message ||"Internal Server Error";
     


    // The below is for mongodbError-> for ex-> Wrong mongo db Id error
    if(err.name==="CastError"){
        const message = `Resource not Found . Invalid : ${err.path}`;
        console.log(err.name);
        err = new ErrorHandler(message,400); // 400 ->means bad request

    }


    // Mongoose Duplicate key error
    if(err.code===11000)
    {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message,400);
    }
    

    // Wrong JWT error
    if(err.code==="JsonwebTokenError")
    {
        const message = `JSON web token is invalid , Try Again !`;
        err = new ErrorHandler(message,400);
    }
    

    // JWT Expire Error
    if(err.code==='TokenExpiredError')
    {
        const message = `Json Web Token is Expired , Try again `;
        err = new ErrorHandler(message,400);
    }


    res.status(err.statusCode).json({
        success:false,
        // error:err.stack,
        error:err.message

    });

}