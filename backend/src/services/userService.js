import { UserRepo } from '../repositories/userRepository.js'
import { hashPassword } from '../../utils/bcrypt.js'
import { comparePassword } from '../../utils/bcrypt.js'
import { generateToken } from '../../utils/tokenGenerate.js'
export const UserService = {
  createUser: async userData => {
    const existingUser = await UserRepo.findByEmail(userData.email)
    const encryptedPassword = await hashPassword(userData.password)
    if (existingUser) {
      throw new Error('User already exists!')
    }
    const user = UserRepo.createUser({
      ...userData,
      password: encryptedPassword
    })
    const { password, ...userWithoutPassword } = await user
    return userWithoutPassword
  },
  getUserById: async id => {
    const user = await UserRepo.findById(id)
    if (!user) {
      throw new error('User not found')
    }
    return user
  },
  updateUser: async (id, updateData) => {
    await UserService.getUserById(id)
    return UserRepo.updateUser(id, updateData)
  },
  deleteUser: async id => {
    await UserService.getUserById(id)
    return UserRepo.deleteUser(id)
  },
  loginUser: async (email, password) => {
    const user = await UserRepo.findByEmail(email)
    if (!user) {
      throw new Error('Invalid email')
    }
    const isMatch = await comparePassword(password, user.password)
    if (!isMatch) {
      throw new Error('Invalid password')
    }
    const { password: _, ...userWithoutPassword } = user
    const accessToken = generateToken(user.id)
    return {
      message: 'user created successfully',
      data: { user: userWithoutPassword, accessToken }
    }
  }
}
