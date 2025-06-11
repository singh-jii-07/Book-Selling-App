import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Routes } from './App/Routes/user.js';
import { bookRoutes } from './App/Routes/Book.js';
import {favouriteRoutes } from './App/Routes/Favourite.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Use separate base paths
app.use('/website/api/user', Routes);
app.use('/website/api/book', bookRoutes);
app.use('/website/api/book', favouriteRoutes);

mongoose.connect(process.env.DBURI)
    .then(() => {
        console.log("Connected to DB");
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("DB connection failed", err);
    });
