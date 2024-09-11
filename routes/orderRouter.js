import express from 'express'
import { order } from '../controllers/orderController.js'
export const orderRouter =express.Router()


orderRouter.route('/orders').post(order)
