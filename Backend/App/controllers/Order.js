import Order from "../modules/order.js";

const orderBook = async (req, res) => {
  try {
    const { order } = req.body;

    if (!order || order.length === 0) {
      return res.status(400).json({ message: "Order is empty" });
    }

    const newOrder = new Order({
      user: req.user.id, 
      book: order,       
      status: "pending"
    });

    await newOrder.save();
    res.status(201).json({ message: "Order created", data: newOrder });
  } catch (err) {
    res.status(500).json({ message: "Error creating order", error: err.message });
  }
};


const getorder = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("book");

    res.status(200).json({ message: "All orders", data: orders });
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", error: err.message });
  }
};


let userorder = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate("book");
    res.status(200).json({ message: "User orders", data: orders });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user orders", error: err.message });
  }
};

let updatedorder=async(req,res)=>{
try {
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order updated", data: updatedOrder });
  } catch (err) {
    res.status(500).json({ message: "Error updating order", error: err.message });
  }

 
}



export{orderBook,getorder,userorder,updatedorder,};