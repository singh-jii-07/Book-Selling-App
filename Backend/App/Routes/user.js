import express from 'express';

import { signUp,signIn  } from '../controllers/user.js';
let Routes=express.Router()
Routes.post('/signUp',signUp)
Routes.post("/signIn",signIn )
export {Routes};