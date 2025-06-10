import User from "../modules/User.js";

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
    try{
    const { name, password } = req.body;
    const existingUsername= await User.findOne({ name });
    if (!existingUsername) {
        return res.status(400).json({ message: "Username not found" });
    }
    const existingPassword = await User.findOne({ password });
    if (!existingPassword) {
        return res.status(400).json({ message: "Incorrect password" });
    }
    res.send({ message: "Login successful", user: existingUsername });
    }
    catch(err){
res.send({message:"Internal Server Error",err})
    }

};

export { signUp, signIn };
