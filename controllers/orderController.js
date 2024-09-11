import { Order } from "../models/order.js";
import { User } from "../models/user.js";




  const order =async(req,res)=>{
    try {
        const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
          req.body;
    
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({status:false, message: "User not found" });
        }
    
        const products = cartItems.map((item) => ({
          name: item?.title,
          quantity: item.quantity,
          price: item.price,
          image: item?.image,
        }));
    
      
        const order = new Order({
          user: userId,
          products: products,
          total: totalPrice,
          shippingAddress: shippingAddress,
          paymentMethod: paymentMethod,
        });
    
        await order.save();
    console.log(order)
        res.status(200).json({status:true, message: "Order created successfully!" });
      } catch (error) {
        console.log("error creating orders", error);
        res.status(500).json({status:false, message: "Error creating orders" });
      }
  }
  export {order}