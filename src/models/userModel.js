import mongoose from "mongoose";

const  userSchema = new mongoose.Schema({
    username: { type : String , required : true },
    email: {type :String, unique :true ,required : true},
    password:{type :String, required : true},
    isVerified: {type : Boolean, default : false},
    isAdmin: {type :Boolean,default :false},
    verifyToken :{type :String},
    verifyTokenExpiry:{type :Date},
    resetPasswordToken: {type : String},
    resetPasswordTokenExpiry:{type : Date}
    }); 
    const User = mongoose.models.users ||  mongoose.model("users",userSchema); 
    export default  User;
   
  
