import jwt from 'jsonwebtoken'
import { UserRepo } from '../repositories/userRepository.js'
import { asyncHandler } from '../../utils/asyncHandler.js'

export const authMiddleware = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      const token = req.headers.authorization.substring(7)
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
      req.user = await UserRepo.findById(decoded.id)
      next()
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' })
    }
  } else {
    return res.status(401).json({ message: 'Not authorized!' })
  }
})
