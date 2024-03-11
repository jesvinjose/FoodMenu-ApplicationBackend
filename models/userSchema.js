import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    fullName:{
        type:String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    adminRole:{
        type:Boolean,
        default:false
    }
    
},{timeStamp:true})

export const User = mongoose.model('User', userSchema);