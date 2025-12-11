import { z } from 'zod'

const nameRegex = /^[A-Za-z][A-Za-z ]*[A-Za-z]$/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const userSchema = z
  .object({
    name: z
      .string()
      .min(3, 'Name must be at least 3 characters long')
      .max(50, 'Name cannot exceed 50 characters')
      .regex(nameRegex, 'Name can only contain letters and spaces'),
    email: z.string().regex(emailRegex, 'Invalid email address'),
    password: z.string().min(6, 'Password must be atleast 6 character long.'),
    confirmPassword: z.string(),
    age: z
      .string()
      .min(1, 'Age is required')
      .refine(val => !isNaN(Number(val), 'Age must be a number')),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER', '']).optional()
  })

  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })
  // .refine(data => Number(data.age)
  // if (Number(data.age) < 18) {
  .refine(
    data => {
      const age = Number(data.age)
      // If age > 18 => gender cannot be empty
      if (age > 18 && data.gender === '') {
        return false
      }
      return true
    },
    {
      path: ['gender'],
      message: 'Gender is required for age above 18'
    }
  )
