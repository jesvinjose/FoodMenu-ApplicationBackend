import express from 'express';
import { updateProfile, userLogin, userLogout, userRegister } from '../controllers/userController.js';
import { userAuth } from '../middlewares/userMiddlewares.js';
import { menuListing } from '../controllers/menuController.js';

const userRoute=express.Router();

userRoute.post('/register',userRegister)
userRoute.post('/login',userLogin)
userRoute.get('/logout',userAuth,userLogout)
userRoute.patch('/updateProfile',userAuth,updateProfile)

userRoute.get('/listMenu',menuListing)


export default userRoute;