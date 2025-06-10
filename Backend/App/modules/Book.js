import mongoose from "mongoose";
const Book = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    language:{
        type: String,
        required: true
    }
},{
    timestamps: true
});
const book=mongoose.model('Books', book);
export default book;