import express from 'express'
import { UserController } from '../controllers/userController.js'
import { authMiddleware } from '../middleware/auth.js'
import { upload } from '../middleware/upload.js'
const router = express.Router()

router.post('/', UserController.createUser)
router.post('/login', UserController.loginUser)
router.get('/:id', authMiddleware, UserController.getUserById)
router.post('/forgot-password', UserController.forgotPassword)
router.post('/reset-password/:token', UserController.resetPassword)
router.put(
  '/avatar',
  authMiddleware,
  upload.single('avatar'),
  UserController.uploadAvatar
)
export default router
