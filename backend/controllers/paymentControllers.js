

const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);




exports.processPayment = catchAsyncErrors(async(req,res,next) =>{
   
   
      
    
    const myPayment = await stripe.paymentIntents.create({
        
        // metdata:{
            //   company:"Ecommerce",
            // },
        amount: req.body.amount,
        currency:'INR',
        automatic_payment_methods: {
          enabled: true,
        },
        description:"Payement for developers purpose only",
    });

   


    res.status(200).json({success:true,client_secret:myPayment.client_secret});


    
});




// For sending the key to frontend
exports.sendStripeApiKey = catchAsyncErrors (async(req,res,next)=>{
    res.status(200).json({stripeApiKey:process.env.STRIPE_API_KEY});

})