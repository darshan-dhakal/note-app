import express from 'express'
const router = express.Router()
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote
} from '../controllers/noteController.js'
import { authMiddleware } from '../middleware/auth.js'

router.get('/', authMiddleware, getNotes)
router.post('/', authMiddleware, createNote)
router.put('/:id', updateNote)
router.delete('/:id', deleteNote)

export default router
