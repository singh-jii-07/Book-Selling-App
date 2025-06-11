import jwt from "jsonwebtoken";
import Book from "../modules/Book.js";
import User from "../modules/User.js"; // Make sure this path is correct

let addBook = async (req, res) => {
    try {
        const { id } = req.headers;

        // Fetch user using the ID from headers
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the user is admin
        if (user.role !== "admin") {
            return res.status(401).json({ message: "You are not authorized to perform this action" });
        }

        // Now create a new book
        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            url: req.body.url,
            price: req.body.price,
            language: req.body.language,
            description: req.body.description
        });

        await book.save();
        res.status(201).json({ message: "Book added", book });

    } catch (err) {
        console.error("Internal Server Error:", err);
        res.status(500).json({ message: "Error occurred", error: err.message || err });
    }
};

export { addBook };
