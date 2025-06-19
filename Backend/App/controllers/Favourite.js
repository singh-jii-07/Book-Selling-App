import User from "../modules/User.js"; 
import Book from '../modules/Book.js' 
let  addFavourite=async(req,res)=>{
    const {bookid,id}=req.headers;
    try {
        const userData = await User.findById(id);

        const isBookFavourite = userData.favourites.includes(bookid);

        if (isBookFavourite) {
            return res.status(200).json({ message: "Book is already in favourites" });
        }

        await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });

        return res.status(200).json({ message: "Book added to favourites" });
    } catch (err) {
        console.error("Internal Server Error:", err);
        res.status(500).json({ message: "Error occurred", error: err.message || err });
    }
}
const deleteFavourite = async (req, res) => {
  const { bookid, id } = req.headers;

  if (!bookid || !id) {
    return res.status(400).json({ message: "User ID or Book ID missing" });
  }

  try {
    const userData = await User.findById(id);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const isBookFavourite = userData.favourites.includes(bookid);
    if (!isBookFavourite) {
      return res.status(404).json({ message: "Book not found in favourites" });
    }

    await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });

    return res.status(200).json({ message: "Book removed from favourites" });
  } catch (err) {
    console.error("Internal Server Error:", err);
    res.status(500).json({ message: "Error occurred", error: err.message || err });
  }
};


const getFavourite = async (req, res) => {
  try {
    const userId = req.headers.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID not provided in headers" });
    }

    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get full book details
    const favouriteBooks = await Book.find({ _id: { $in: userData.favourites } });

    return res.status(200).json({ message: "Success", data: favouriteBooks });
  } catch (err) {
    console.error("Internal Server Error:", err);
    res.status(500).json({ message: "Error occurred", error: err.message || err });
  }
};




export{addFavourite,deleteFavourite,getFavourite}