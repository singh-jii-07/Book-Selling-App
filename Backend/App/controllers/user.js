import User from "../modules/User.js";
import jwt from "jsonwebtoken";
let signUp = async (req, res) => {
    try {
        const { name, email, password, address } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (name.length < 3 || name.length > 20) {
            return res.status(400).json({ message: "Username must be between 3 and 20 characters" });
        }

        if (password.length < 6 || password.length > 20) {
            return res.status(400).json({ message: "Password must be between 6 and 20 characters" });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const existingUsername = await User.findOne({ name });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already taken" });
        }

        // Save plain password (not recommended for production)
        const user = new User({
            name,
            email,
            password,
            address
        });

        await user.save();
        res.status(201).json({ message: "User created successfully", user });

    } catch (err) {
  console.error("Signup Error:", err); // ✅ log error to console
  res.status(500).json({ message: "Internal Server Error", error: err.message || err });
}

};
let signIn = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ message: "Both name and password are required" });
    }

    const user = await User.findOne({ name });

    if (!user) {
      return res.status(400).json({ message: "Username not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Incorrect password" });
    }

 
    const payload = {
      id: user._id,
      name: user.name,
      role: user.role
    };

    const token = jwt.sign(payload, "bookStore123", { expiresIn: "30d" });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error("SignIn Error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message || err });
  }
};
 let authenticate = async (req, res, next) => {
try{
const{id}=req.headers;
const data=await User.findById(id);
return res.status(200).json({
    message: "User authenticated successfully",
    data:data
})
}
catch (err){
    console.error("Authentication Error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message || err });
}
 }

 let update=async(req,res)=>{
    try{
const{id}=req.headers;
const{address}=req.body
const data=await User.findByIdAndUpdate(id,{$set:{address:address}});
return res.status(200).json({
    message: "User updated successfully",
    data:data
})
    }
    catch(err){
        console.error("Update Error:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message || err });
    }
 }

export { signUp, signIn, authenticate,update };
