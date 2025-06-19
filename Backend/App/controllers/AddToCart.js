import User from "../modules/User.js";
import Book from "../modules/Book.js";
let addToCart = async (req, res) => {
    try {
      const { bookid, id } = req.headers;
    const userData = await User.findById(id);

    const isAddToCart = userData.cart.includes(bookid);

    if (isAddToCart) {
      return res.status(200).json({ message: "Book is already in Cart" });
    }

    await User.findByIdAndUpdate(id, { $push: { cart: bookid } });

    return res.status(200).json({ message: "Book added to Cart" });
  } catch (err) {
    console.error("Internal Server Error:", err);
    res
      .status(500)
      .json({ message: "Error occurred", error: err.message || err });
  }
};
let deleteToCart = async (req, res) => {
  const { bookid} = req.params;
  const { id } = req.headers;
  try {
    await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });

    return res.status(200).json({ message: "Book remove to cart" });
  } catch (err) {
    console.error("Internal Server Error:", err);
    res
      .status(500)
      .json({ message: "Error occurred", error: err.message || err });
  }
};

const getToCart = async (req, res) => {
  try {
    const userId = req.headers.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID not provided in headers" });
    }

    const userData = await User.findById(userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch full book details from cart
    const fullCartBooks = await Book.find({ _id: { $in: userData.cart } });

    return res.status(200).json({ message: "Success", data: fullCartBooks });
  } catch (err) {
    console.error("Internal Server Error:", err);
    res.status(500).json({ message: "Error occurred", error: err.message || err });
  }
};


export { addToCart, getToCart, deleteToCart };
