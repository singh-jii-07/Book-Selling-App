import express from 'express';
import { authenticateToken } from '../Middleware/Useraauthor.js';
import { addBook, UpdateBook,deletBook, getAllBook, getOnlyFour } from '../controllers/Book.js';

const bookRoutes = express.Router();

bookRoutes.post('/addBook', authenticateToken, addBook);
bookRoutes.put('/updateBook',authenticateToken,UpdateBook);
bookRoutes.delete('/deletBook',authenticateToken,deletBook);
bookRoutes.get('/getAll',getAllBook)
bookRoutes.get('/getFour',getOnlyFour)
export { bookRoutes };
