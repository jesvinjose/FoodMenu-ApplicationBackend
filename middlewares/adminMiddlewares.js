import jwt from 'jsonwebtoken'
import {User}  from '../models/userSchema.js';

export const adminAuth = async(req, res, next) => {
  const cookieHeader = req.headers.cookie;

  if (!cookieHeader) {
    return res.status(403).json({message:"No cookie"})
  } 
  const cookiesArray = cookieHeader.split(";");

  const cookies = {};

  cookiesArray.forEach((cookie) => {
    const [name, value] = cookie.trim().split("=");
    cookies[name] = value;
  });

  const isUser=jwt.verify(cookies.adminAccessToken,process.env.usertoken_secretKey)

  const userExists=await User.findOne({email:isUser.email})
  if(!userExists) {
    return res.status(401).json({message:"User Not existing"})
  }
  if(isUser.role==='admin' && userExists.adminRole){
    return next();
  }
  return res.status(401).json({message:"Not authenticated"})

};