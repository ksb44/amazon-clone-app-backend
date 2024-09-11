import { User } from "../models/user.js"

async function verifyEmailController(req,res){
try {

    const token = req.params.token
    const user = await User.findOne({verificationToken:token})
    if(!user){
        return res.status(404).json({message:"User not found"})
        }
        user.verified = true
        user.verificationToken = null
        await user.save()
        res.json({message:"Email verified successfully"})

} catch (error) {
    return res.status(500).json({
        message: "Error verifying email",
    })
}
}


export {verifyEmailController}