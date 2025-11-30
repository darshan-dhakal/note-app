import { z } from 'zod'

export const userSchema = z
  .object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be atleast 6 character long.'),
    confirmPassword: z.string(),
    age: z
      .string()
      .min(1, 'Age is required')
      .refine(val => !isNaN(Number(val), 'Age must be a number')),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER'], {
      required_error: 'Gender is required'
    })
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })
