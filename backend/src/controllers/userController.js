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
  }
}
