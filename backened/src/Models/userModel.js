//User Schema

import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "node:crypto";

const userSchema = new mongoose.Schema(
  {
    name:{
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
      maxLength:[50, "your name cannot be longer than 50 characters"]
    }, 
    email: {
      type: String,
      required: [true, "Please enter your email ID"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please enter a valid email ID"]
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [6, "your password must be at least 6 characters"],
      select: false
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function(el) {
          return el === this.password;
        },
        message: "Passwords are not the same!"
      }
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    role: {
      type: String,
      enum:["user", "admin"],
      default: "user"
    },
    avatar:{
      url:{type:String},
      public_id:{type:String}
    },
    passwordChangedAt:{
      type: Date
    },
    passwordResetToken:{
      type:String,
      select:false,
      index:true
    },
    passwordResetExpires:{
      type:Date,
      select:false,
    },


  },
  {timestamps:true}
)

//Settings to not pass the pass in response from server
userSchema.set("toJSON",{
  transform:function (doc,ret){
    delete ret.password,
    delete ret.passwordConfirm,
    delete ret.passwordResetToken,
    delete ret.passwordResetExpires,
    delete ret.__v;
    return ret;
  }
})

//password logic
//Hashing do not stores the password in plain text
userSchema.pre("save",async function(){
  if(!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12)
  this.passwordConfirm = undefined;
  
});

//Login check
userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
  return await bcrypt.compare(candidatePassword, userPassword);
}

//It is for if anyone changes the password after the token is issued then it will not allow to access the resources
userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
  if(this.passwordChangedAt){
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
);
    return JWTTimestamp < changedTimeStamp ;
  }
  return false;
}

//Forgot password
userSchema.methods.createPasswordResetToken = function(){
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto.createHash("sha256")
  .update(resetToken)
  .digest("hex");

  this.passwordResetExpires = Date.now()  + 10 * 60 * 1000; //10 minutes
  return resetToken;
}

const User = mongoose.model("User", userSchema);
//In mongodb it will create a collection called users and store the data in it
export {User};
