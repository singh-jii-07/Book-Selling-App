import express from 'express';
import { authenticateToken } from '../Middleware/Useraauthor.js';
import { addToCart,deleteToCart,getToCart } from '../controllers/AddToCart.js';
const cartRoutes = express.Router();
cartRoutes.put('/addCart',authenticateToken,addToCart)
cartRoutes.put('/deleteCart/:bookid',authenticateToken,deleteToCart)
cartRoutes.get('/getCart',authenticateToken,getToCart)
export{cartRoutes}