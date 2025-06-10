import mongoose from 'mongoose';
const user= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
   address:{
    type:String,
    required: true
   },
   avatar:{
    type: String,
    default: "https://iconarchive.com/download/i107272/Flat-Icons/User-Avatar-2.ico"
   },
   role:{
    type: String,
    default: "user",
    enum: ["user", "admin"]
   },
   favourites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],                         
},{
    timestamps: true
});
const User = mongoose.model('User', user);
export default User;