import prisma from '../config/prisma.js'

export const getNotes = async (req, res) => {
  const userId = req.user.id
  try {
    const notes = await prisma.note.findMany({
      include: {
        user: {
          select: { id: true, email: true, name: true }
        }
      },
      where: { userId }
    })
    res.json(notes)
    console.log(notes)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notes' })
  }
}

export const createNote = async (req, res) => {
  const { title, content } = req.body
  try {
    // console.log(req.user)

    const newNote = await prisma.note.create({
      data: { title, content, userId: req.user.id }
    })
    res.json(newNote)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create note' })
  }
}

export const updateNote = async (req, res) => {
  const { id } = req.params
  const { title, content } = req.body
  try {
    const updatedNote = await prisma.note.update({
      where: { id: Number(id) },
      data: { title, content }
    })
    res.json(updatedNote)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update note' })
  }
}

export const deleteNote = async (req, res) => {
  const { id } = req.params

  try {
    await prisma.note.delete({
      where: { id: Number(id) }
    })
    res.json({ message: 'Note deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete note' })
  }
}
