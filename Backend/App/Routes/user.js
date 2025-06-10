import express from 'express';
import{ authenticateToken } from '../Middleware/Useraauthor.js';
import { signUp,signIn, authenticate,update  } from '../controllers/user.js';
let Routes=express.Router()
Routes.post('/signUp',signUp)
Routes.post("/signIn",signIn )
Routes.get('/user-info',authenticateToken, authenticate)
Routes.put("/update",update)
export {Routes};