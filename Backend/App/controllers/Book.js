import jwt from "jsonwebtoken";
import Book from "../modules/Book.js";

import User from "../modules/User.js";

let addBook = async (req, res) => {
  try {
    const { id } = req.headers;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res
        .status(401)
        .json({ message: "You are not authorized to perform this action" });
    }

    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      price: req.body.price,
      language: req.body.language,
      description: req.body.description,
    });

    await book.save();
    res.status(201).json({ message: "Book added", book });
  } catch (err) {
    console.error("Internal Server Error:", err);
    res
      .status(500)
      .json({ message: "Error occurred", error: err.message || err });
  }
};

let UpdateBook = async (req, res) => {
  try {
    const { bookid } = req.headers;

    const updatedBook = await Book.findByIdAndUpdate(
      bookid,
      {
        url: req.body.url,
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        desc: req.body.desc,
        language: req.body.language,
      },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({
      message: "Book updated successfully!",
      book: updatedBook,
    });

    
  } catch (error) {
    console.error("Error while updating book:", error);
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

let deletBook = async (req, res) => {
  try {
    const { bookid } = req.headers;

    if (!bookid) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    const deletedBook = await Book.findByIdAndDelete(bookid);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({
      message: "Book deleted successfully!",
    });
  } catch (error) {
    console.error("Error while deleting book:", error);
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

let getAllBook = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });

    return res.status(200).json({
      status: "Success",
      data: books,
    });
  } catch (error) {
    console.error("Error while fetching books:", error);
    return res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

let getOnlyFour = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(4);

    return res.status(200).json({
      status: "Success",
      data: books,
    });
  } catch (error) {
    console.error("Error fetching recent books:", error);
    return res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};
let getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.json({
      status: "Success",
      data: book
    });

  } catch (error) {
    console.error("Error fetching book by ID:", error);
    return res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

export { addBook, UpdateBook, deletBook, getAllBook, getOnlyFour,getBookById };
