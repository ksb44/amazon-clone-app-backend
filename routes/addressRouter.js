
import express from 'express'
import { address, getAddress } from '../controllers/addressController.js'
export const addressRouter =express.Router()


addressRouter.route('/addresses').post(address)
addressRouter.route('/addresses/:userId').get(getAddress)


