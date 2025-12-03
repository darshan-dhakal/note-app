import express from 'express'
import { UserController } from '../controllers/userController.js'
import { authMiddleware } from '../middleware/auth.js'

const router = express.Router()

router.post('/', UserController.createUser)
router.post('/login', UserController.loginUser)
router.get('/:id', authMiddleware, UserController.getUserById)
router.post('/forgot-password', UserController.forgotPassword)
router.put('/reset-password/:token', UserController.resetPassword)
export default router
