const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const catchAsycnErrors = require('../middlewares/catchAsyncErrors');



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please Provide a valid Email']
    },
    // avatar:{
    //    public_Id:{
    //        type:String,
    //        required:true
    //    },
    //    url:{
    //        type:String,
    //        required:true
    //    }
    // },
    role: {
        type: String,
        enum: ["user","guide","lead-guide","admin"],
        default:"user"
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlenght: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: 'Passwords are not the same'
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
});

userSchema.pre('save',async function(next){
   
    // only when password is changed // nahi toh already encrypted password ko encrpyt krdega yeh

   if(!this.isModified('password')) return next();

   this.password = await bcrypt.hash(this.password,12);
    this.passwordConfirm = undefined;
})



// we will get jwt token from schema method in this project unlike other projects(consider jonas sche's)
userSchema.methods.getJWTToken = function(){

    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    });
}


userSchema.methods.correctPassword = async function(candiPass)
{
     return await bcrypt.compare(candiPass,this.password);

};






// Send Password reset Token 

userSchema.methods.createPasswordResetToken = function(){

    const resetToken = crypto.randomBytes(32).toString('hex');


    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');


    this.passwordResetExpires = Date.now()+10*60*1000;// plus 10 min

    return resetToken;

}


const User = mongoose.model("User", userSchema);
module.exports = User;

