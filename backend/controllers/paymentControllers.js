

const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const stripe = require('stripe')('sk_test_51OaO5fSA2MkXqf1KmDy0RWshVqX1cyJAavXSv1qx73PJxUpwavS9uzLU36lbUmrFoWpD7F3ReMdV3EJQiSRZ6QIy00NgDz3bGn');




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
    res.status(200).json({stripeApiKey:pk_test_51OaO5fSA2MkXqf1K8eK0rC9pUYyzTrru70uSR4kiF4JZSNVifRJSm4WSLAmEQZKOw9pyn550ex7flx0rSwPKp7Eb00qAIKCoaW});

})
