import sendVerificationEmail from "../email/sendEmail.js";
import { User } from "../models/user.js";
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
const register =async(req,res)=>{
    try {


        const {name,email,password} = req.body

        const existingEmail = await User.findOne({email})
        if(existingEmail){
            return res.status(400).json({message:"Email already exists"})
            }
            const hashedPassword = await bcrypt.hash(password,10)
            const user =  new User({name,email,password:hashedPassword})

            user.verificationToken =crypto.randomBytes(20).toString('hex')
            await user.save()

            sendVerificationEmail(user.email,user.verificationToken)
            const updatedUser = await User.findById(user._id).select("-password")
            return res.status(200).json({ success: true, message:updatedUser });
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }
}

const secretKey = generateSecretKey()

function generateSecretKey(){
    return crypto.randomBytes(32).toString('hex')
}
const login =async(req,res) =>{

    try {
        
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({success:false,message:"Email not found"})
            }
            const isVerified =  user.verified == true
            if(!isVerified){
                return res.status(400).json({success:false,message:"Email not verified Please verify it!"})
                }

            const isValidPassword = await bcrypt.compare(password,user.password)
            if(!isValidPassword){
                return res.status(400).json({success:false,message:"Invalid password"})
                }
                
                const token = jwt.sign(
                    {
                        id:user._id
                    },
                    secretKey,
                    {
                        expiresIn:"1h"
                    }
                )
                return res.status(200).json({ success: true, message:token });


    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:error})
    }
}

export {register,login}