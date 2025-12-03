import { UserService } from '../services/userService.js'

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
      // console.log(user)
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
  // getUserByAge: async (req, res) => {
  //   try {
  //     const ageData = await UserService.getUserAge(req.params.id)
  //     res.status(200).json(ageData)
  //     console.log(ageData)
  //   } catch (error) {
  //     res.status(404).json({ error: error.message })
  //   }
  // },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body

      // Check if user exists
      const user = await prisma.user.findUnique({ where: { email } })
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      // Create reset token
      const resetToken = crypto.randomBytes(32).toString('hex')
      const resetTokenExpiry = Date.now() + 1000 * 60 * 10 // 10 minutes

      // Save token to database
      await prisma.user.update({
        where: { email },
        data: {
          resetToken,
          resetTokenExpiry
        }
      })

      // Create password reset link
      const resetLink = `http://localhost:5173/reset-password/${resetToken}`

      // Setup email sender
      const transporter = nodemailer.createTransport({
        service: 'gmail',
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
      console.error(error)
      res.status(500).json({ error: 'Something went wrong' })
    }
  }
}
