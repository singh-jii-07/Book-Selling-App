import express from 'express';
import { authenticateToken } from '../Middleware/Useraauthor.js';
import { addFavourite, deletFavourite } from '../controllers/Favourite.js';

const favouriteRoutes = express.Router();
favouriteRoutes.put('/addFavourite',authenticateToken,addFavourite)
favouriteRoutes.delete('/deletFavourite',authenticateToken,deletFavourite)

export{favouriteRoutes}