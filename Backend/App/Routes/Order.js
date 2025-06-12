import express from 'express';
import { authenticateToken } from '../Middleware/Useraauthor.js';
import { getorder, orderBook, updatedorder, userorder } from '../controllers/Order.js';

const orderRoutes = express.Router();
orderRoutes.post('/orderbook',authenticateToken,orderBook)
orderRoutes.get('/getorderbook',authenticateToken,getorder)
orderRoutes.get('/userorderbook/:userId',authenticateToken,userorder)
orderRoutes.put('/updatedorderbook/:orderId',authenticateToken,updatedorder)
export {orderRoutes}