import { UserRepo } from '../repositories/userRepository.js'
import { UserService } from '../services/userService.js'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import prisma from '../config/prisma.js'
import dotenv from 'dotenv'
import { hashPassword } from '../../utils/bcrypt.js'
import { type } from 'os'

dotenv.config()

export const UserController = {
  createUser: async (req, res) => {
    try {
      const user = await UserService.createUser(req.body)
      res.status(201).json(user)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await UserService.loginUser(email, password)
      res.status(200).json(user)
    } catch (error) {
      res.status(401).json({ error: error.message })
    }
  },
  getUserById: async (req, res) => {
    try {
      const user = await UserService.getUserById(req.params.id)
      res.status(200).json(user)
    } catch (error) {
      res.status(404).json({ error: error.message })
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body
      const user = await UserService.getUserByEmail(email)
      // Check if user exists
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      // Create reset token
      const resetToken = crypto.randomBytes(32).toString('hex')
      const resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 10) // 10 minutes

      // Save token to database
      const updatedUser = await UserService.updateUser(user.id, {
        resetToken,
        resetTokenExpiry
      })

      // Create password reset link
      const resetLink = `http://localhost:5173/reset-password/${resetToken}`

      // Setup email sender
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      })

      // Send email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Reset Your Password',
        html: `
        <h2>Password Reset Request</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link is valid for 10 minutes.</p>
      `
      })

      res.json({ message: 'Reset link sent to email' })
    } catch (error) {
      res.status(500).json({ error })
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { token } = req.params
      const { password } = req.body

      // Find user by reset token and check expiry
      const user = await prisma.user.findFirst({
        where: {
          resetToken: token,
          resetTokenExpiry: {
            gt: new Date(Date.now())
          }
        }
      })

      if (!user) {
        return res.status(400).json({ error: 'Invalid or expired token' })
      }

      // Hash new password
      const hashedPassword = await hashPassword(password)

      // Update user's password and clear reset token
      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          resetToken: null,
          resetTokenExpiry: null
        }
      })

      res.json({ message: 'Password has been reset successfully' })
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' })
    }
  }
}
