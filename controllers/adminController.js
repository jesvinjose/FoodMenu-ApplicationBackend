import {
  jsonErrorHandler,
  jsonSuccessHandler,
} from "../helpers/jsonHandler.js";
import { hashPassword } from "../helpers/passwordHashing.js";
import { isValidEmail, isValidPassword } from "../helpers/validations.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

export const adminRegister = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;
    const isEmailValid = isValidEmail(email);
    const isPasswordValid = isValidPassword(password);
    if (!isEmailValid) {
        return res.status(422).json(jsonErrorHandler["error1"]);
    }
    if (!isPasswordValid) {
        return res.status(422).json(jsonErrorHandler["error2"]);
    }
    if (password !== confirmPassword) {
        return res.json(jsonErrorHandler["error3"]);
    }
    const adminExists=await User.findOne({email:email})
    if(adminExists){
        return res.status(422).json(jsonErrorHandler["error5"]);
    }
    const hashedPassword = await hashPassword(password);
    const data = { fullName, password: hashedPassword, email, adminRole: true };
    const result = new User(data);
    const response = await result.save();
    res.status(201).json(jsonSuccessHandler["success1"]);
  } catch (error) {
    res.status(500).json(jsonErrorHandler["error0"]);
  }
};

export const adminLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const isEmailValid = isValidEmail(email);
      if (!isEmailValid) {
        return res.status(422).json(jsonErrorHandler["error1"]);
      }
      const user = await User.findOne({ email: email,adminRole:true}); 
      if(!user){
          return res.status(404).json(jsonErrorHandler["error4"]);
      }
      const passwordChecking = await bcrypt.compare(password, user.password);
      if(!passwordChecking){
        return res.json(jsonErrorHandler["error2"]);
      }
      const token = jwt.sign(
        {
          _id: user._id, 
          email: user.email, 
          fullName: user.fullName,
          role:"admin"
        },
        process.env.usertoken_secretKey,
        {
          expiresIn: "1h", 
        }
      );
      res.cookie("adminAccessToken", token, { httpOnly: true, maxAge: 3600000 }); 
  
      res.status(200).json(jsonSuccessHandler['success2']);
  
    } catch (error) {
      res.status(500).json(jsonErrorHandler['error0'])
    }
  };

export const changeRole=async(req,res)=>{
    try {
        const {email}=req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
          return res.status(404).json(jsonErrorHandler["error4"]);
        }  
        const status=!user.adminRole
        const result=await User.updateOne({email:email},{$set:{adminRole:status}})   
        return res.status(200).json(jsonSuccessHandler['success5'])  
    } catch (error) {
        res.status(500).json(jsonErrorHandler['error0'])
    }
}

export const listUsers=async(req,res)=>{
    try {

        const userList=await User.aggregate([{$match:{adminRole:false}},{$project:{password:0}}]);
        return res.status(200).json({userList,status:"success"})  

    } catch (error) {
        res.status(500).json(jsonErrorHandler['error0'])
    }
}



  export const adminLogout=async(req,res)=>{
    try {
        res.clearCookie('adminAccessToken');
        res.status(200).json(jsonSuccessHandler['success3'])
    } catch (error) {
        res.status(500).json(jsonErrorHandler['error0'])
    }
}