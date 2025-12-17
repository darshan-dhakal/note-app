import express from 'express'
import cors from 'cors'
import noteRoutes from './routes/noteRoutes.js'
import userRoutes from './routes/userRoutes.js'
import './jobs/reminderJob.js'

const app = express()

app.use(
  cors({
    origin: ['https://note-app-9q2y.vercel.app', 'http://localhost:5173'],
    credentials: true
  })
)
app.use(express.json())

app.use('/api/notes', noteRoutes)
app.use('/api/users', userRoutes)
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

export default app
