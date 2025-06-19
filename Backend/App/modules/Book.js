import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    language: { type: String, required: true },
}, {
    timestamps: true
});

const Book = mongoose.model('Book', bookSchema); // ✅ use 'Book' with capital B
export default Book;
