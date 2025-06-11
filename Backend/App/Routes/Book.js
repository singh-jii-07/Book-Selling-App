import express from 'express';
import { authenticateToken } from '../Middleware/Useraauthor.js';
import { addBook } from '../controllers/Book.js';

const bookRoutes = express.Router();

bookRoutes.post('/addBook', authenticateToken, addBook);
bookRoutes.get('/test', (req, res) => res.send("Book API works"));

export { bookRoutes };
