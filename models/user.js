import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
            type:String,
            required:true
        },
        verified:{
            type:Boolean,
            default:false

        },
        verificationToken:{
            type:String,
        },
        addresses:[
            {
                name:String,
                street:String,
                city:String,
                landmark:String,
                postalCode:String,
                country:String,
                mobileNo:String,
                houseNo:String

            }
        ],
        orders:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Order"
            },

        ],

        createdAt:{
            type:Date,
            default:Date.now
        }

})


export const User =mongoose.model('User',userSchema)

