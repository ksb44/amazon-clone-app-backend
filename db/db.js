import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
export async function db(){

    try {
   const connect= await mongoose.connect(process.env.MONGO_URI)
   console.log('db is connected',connect.connection.host)
 
    } catch (error) {
        console.log(error)
    }


}