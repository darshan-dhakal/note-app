import jwt from 'jsonwebtoken'
import { UserRepo } from '../repositories/userRepository.js'
import { asyncHandler } from '../../utils/asyncHandler.js'

export const authMiddleware = asyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
      console.log('Decoded token:', decoded)

      req.user = await UserRepo.findById(decoded.id)
      console.log('User fetched in auth middleware:', req.user)

      next()
      console.log('User authenticated:', req.user)
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' })
    }
  }
  if (!token) {
    res.status(401).json({ message: 'Not authorized!' })
  }
})
