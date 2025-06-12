import express from 'express';
import { authenticateToken } from '../Middleware/Useraauthor.js';
import { addFavourite, deletFavourite, getFavourite } from '../controllers/Favourite.js';

const favouriteRoutes = express.Router();
favouriteRoutes.put('/addFavourite',authenticateToken,addFavourite)
favouriteRoutes.delete('/deletFavourite',authenticateToken,deletFavourite)
favouriteRoutes.get('/getfavourite',authenticateToken,getFavourite)

export{favouriteRoutes}