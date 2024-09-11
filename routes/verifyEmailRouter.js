
import {Router} from 'express'
import { verifyEmailController } from '../controllers/verifyEmailController.js'

export const verifyEmailRouter = Router()

verifyEmailRouter.route('/verify/:token').get(verifyEmailController)