import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Routes } from './App/Routes/user.js';
import { bookRoutes } from './App/Routes/Book.js';
import {favouriteRoutes } from './App/Routes/Favourite.js';
import { cartRoutes } from './App/Routes/AddToCart.js';
import { orderRoutes } from './App/Routes/Order.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Use separate base paths
app.use('/website/api/user', Routes);
app.use('/website/api/book', bookRoutes);
app.use('/website/api/book', favouriteRoutes);
app.use('/website/api/book', cartRoutes);
app.use('/website/api/book', orderRoutes);

mongoose.connect(process.env.DBURI)
    .then(() => {
        console.log("Connected to DB");
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
        app.get('/', (req, res) => {
            res.send("Welcome to Book Store API");
        });
    })
    .catch((err) => {
        console.log("DB connection failed", err);
    });
