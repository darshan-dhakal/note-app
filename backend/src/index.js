import express from 'express'
import cors from 'cors'
import noteRoutes from './routes/noteRoutes.js'
import userRoutes from './routes/userRoutes.js'
import './jobs/reminderJob.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/notes', noteRoutes)
app.use('/api/users', userRoutes)
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

export default app
