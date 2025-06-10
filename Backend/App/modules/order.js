import mongoose from "mongoose";
 const Order = new mongoose.Schema({
user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
},
book:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
},
status:{
    type: String,
    enum: ['order placed', 'shipped', 'delivered', 'cancelled', 'pending'],
    default: 'order placed'
}

 },{
    timestamps: true})
    const order= mongoose.model('Order', Order);
export default order;