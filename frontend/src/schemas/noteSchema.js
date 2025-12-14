import { z } from 'zod'

const isoDateString = z.string().refine(val => !isNaN(Date.parse(val)), {
  message: 'Invalid datetime'
})
export const noteSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  reminders: z
    .array(
      z.object({
        at: isoDateString
      })
    )
    .optional()
})
