import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { db } from './db/db.js'
import { userRouter } from './routes/userRouter.js'
import { verifyEmailRouter } from './routes/verifyEmailRouter.js'
import { addressRouter } from './routes/addressRouter.js'
import { orderRouter } from './routes/orderRouter.js'
import { User } from './models/user.js'
import { Order } from './models/order.js'
const app =express()
db()

app.use(cors())
app.use(bodyParser.json())

const PORT = 3000


app.use('/api/user',userRouter)
app.use('/api/email',verifyEmailRouter)
app.use('/api/address',addressRouter)
app.use('/api/order',orderRouter)

app.get("/profile/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({status:false, message: "User not found" });
      }
  
      res.status(200).json({status:true, message:user });
    } catch (error) {
      res.status(500).json({ status:false,message: "Error retrieving the user profile" });
    }
  });
  
  app.get("/orders/:userId",async(req,res) => {
    try{
      const userId = req.params.userId;
  
      const orders = await Order.find({user:userId}).populate("user");
  
      if(!orders || orders.length === 0){
        return res.status(404).json({status:false,message:"No orders found for this user"})
      }
  
      res.status(200).json({status:true, message:orders });
    } catch(error){
      res.status(500).json({status:false, message: "Error"});
    }
  })

app.listen(PORT,()=>{

    console.log(`server is connected at ${PORT}`)
})

