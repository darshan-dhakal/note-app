import { UserRepo } from '../repositories/userRepository.js'
import { hashPassword } from '../../utils/bcrypt.js'
import { comparePassword } from '../../utils/bcrypt.js'
import { generateToken } from '../../utils/tokenGenerate.js'

export const UserService = {
  createUser: async userData => {
    const existingUser = await UserRepo.findByEmail(userData.email)
    if (existingUser) {
      throw new Error('User already exists!')
    }
    const encryptedPassword = await hashPassword(userData.password)
    const userAge = parseInt(userData.age, 10)
    if (isNaN(userAge) || userAge < 0) {
      throw new Error('Invalid age provided')
    }
    // const numericAge = Number(userData.age)
    let savingUserData = {
      ...userData,
      age: userAge,
      password: encryptedPassword
    }
    if (userData.gender) {
      savingUserData.gender = userData.gender
    }
    const savedUser = await UserRepo.createUser(savingUserData)
    if (!savedUser) {
      throw new Error('Failed to create user')
    }

    const { password, ...userWithoutPassword } = savedUser
    return userWithoutPassword
  },
  getUserById: async id => {
    const user = await UserRepo.findById(id)
    if (!user) {
      throw new error('User not found')
    }
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  },
  getUserByEmail: async email => {
    const user = await UserRepo.findByEmail(email)
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
      message: 'user logged in successfully',
      data: { user: userWithoutPassword, accessToken }
    }
  },
  // forgotPassword: async email => {
  //   const user = await UserRepo.findByEmail(email)
  //   if (!user) {
  //     throw new Error('User not found')
  //   }
  // Further implementation for password reset can be added here
  // return { message: 'Password reset link sent to your email!' }
  // },
  getUserAge: async id => {
    const ageData = await UserRepo.getAge(id)
    if (!ageData) {
      throw new Error('User not found')
    }
    return ageData
  }
}
