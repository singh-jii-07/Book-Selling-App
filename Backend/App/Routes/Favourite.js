import express from 'express';
import { authenticateToken } from '../Middleware/Useraauthor.js';
import { addFavourite, deleteFavourite, getFavourite } from '../controllers/Favourite.js';

const favouriteRoutes = express.Router();
favouriteRoutes.put('/addFavourite',authenticateToken,addFavourite)
favouriteRoutes.put('/deletFavourite',authenticateToken,deleteFavourite)
favouriteRoutes.get('/getfavourite',authenticateToken,getFavourite)

export{favouriteRoutes}