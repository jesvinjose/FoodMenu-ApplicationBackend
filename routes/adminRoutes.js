import express from 'express';
import { adminLogin, adminLogout, adminRegister, changeRole, listUsers } from '../controllers/adminController.js';
import { adminAuth } from '../middlewares/adminMiddlewares.js';
import { createMenu, updateMenu } from '../controllers/menuController.js';

const adminRoute=express.Router();

adminRoute.post('/register',adminRegister)
adminRoute.post('/login',adminLogin)
adminRoute.get('/logout',adminAuth,adminLogout)
adminRoute.patch('/updateRole',adminAuth,changeRole)
adminRoute.get('/listUsers',adminAuth,listUsers)

adminRoute.post('/createMenu',adminAuth,createMenu)
adminRoute.patch('/updateMenu',adminAuth,updateMenu)

export default adminRoute;