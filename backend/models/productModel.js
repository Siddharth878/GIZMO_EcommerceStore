const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    
    
    name:{
        type:String,
        required:[true,"Please Enter product name"],
        trim:true,
    },

    description:{
        type:String,
        required:[true,"Please enter the product Description"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter product Price"],
        maxLength:[0,"Price cannot exceed 8 characters"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[{
        type:String,
        required:true
    }],
    category:{
        type:String,
        required:[true,"Please product Category"]
    },
    Stock:{
        type:Number,
        required:[true,"Please Enter Product Stock"],
        maxLenght:[4,"Stock cannont exceed 4 characters"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    brand:{
        type:String,
    },
    size:{
        type:String,
    },
    weight:{
        type:String,
    },
    reviews:[{ // [] -> means array of reviews
    
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    
    name :{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    comment:{
        type:String,
        required:true,
     }
    }
   ],

   user:{
       type:mongoose.Schema.ObjectId,
       ref:"User",
       required:true
   },

   createdAt:{
       type:Date,
       default:Date.now
   }

   
    
});


const products = new mongoose.model("products",productSchema);

module.exports = products;

