import express from 'express'
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {Routes} from './App/Routes/user.js'
dotenv.config();
let app=express();
app.use(express.json());
app.use(cors());
app.use('/website/api/book',Routes );
 mongoose.connect(process.env.DBURI).then(()=>{
    console.log("connected to db");
    app.listen(process.env.PORT,()=>{
        console.log(`server is running on port ${process.env.PORT}`);
    });
 }).catch((err)=>{
    console.log("db connection failed",err);
 })