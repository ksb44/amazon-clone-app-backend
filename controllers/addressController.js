import { User } from "../models/user.js";


const address =async(req,res) =>{
    try {
        const { userId, address } = req.body;
    
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({status:false, message: "User not found" });
        }
    
        user.addresses.push(address);
    
        await user.save();
    
        res.status(200).json({status:true, message: "Address created Successfully" });
      } catch (error) {
        res.status(500).json({status:false, message: "Error addding address" });
      }
}
const getAddress =async(req,res) =>{
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({status:false, message: "User not found" });
    }

    const addresses = user.addresses;
    res.status(200).json({status:true, addresses });
  } catch (error) {
    res.status(500).json({status:false, message: "Error retrieveing the addresses" });
  }
}
export {address,getAddress}