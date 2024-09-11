
import express from 'express'
import { login, register } from '../controllers/userController.js'
export const userRouter =express.Router()


 userRouter.route('/register').post(register)
 userRouter.route('/login').post(login)


