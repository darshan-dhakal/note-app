import prisma from '../config/prisma.js'

export const getNotes = async (req, res) => {
  const userId = req.user.id
  try {
    const notes = await prisma.note.findMany({
      where: {
        userId: req.user.id // assumes you have user ID from auth middleware
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        reminders: true // include all reminders
      }
    })
    console.log(notes)
    res.json(notes)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notes' })
  }
}

export const createNote = async (req, res) => {
  const { title, content, reminders } = req.body
  try {
    const newNote = await prisma.note.create({
      data: {
        title,
        content,
        userId: req.user.id,
        reminders: reminders?.length
          ? {
              create: reminders.map(r => ({
                at: new Date(r.at)
              }))
            }
          : undefined
      },
      include: {
        reminders: true
      }
    })
    res.status(201).json(newNote)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create note' })
  }
}

// export const updateNote = async (req, res) => {
//   const { id } = req.params
//   const { title, content, reminders } = req.body
//   try {
//     const updatedNote = await prisma.note.update({
//       where: { id: Number(id) },
//       data: { title, content, reminders }
//     })
//     res.json(updatedNote)
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to update note' })
//   }
// }
export const updateNote = async (req, res) => {
  const noteId = Number(req.params.id)
  const { title, content, reminders } = req.body

  try {
    const note = await prisma.note.findFirst({
      where: { id: noteId, userId: req.user.id },
      include: { reminders: true }
    })

    if (!note) {
      return res.status(404).json({ error: 'Note not found' })
    }

    await prisma.$transaction(async tx => {
      // 1. Update note content
      await tx.note.update({
        where: { id: noteId },
        data: { title, content }
      })

      const existingReminder = note.reminders[0]

      // 2. Handle reminder logic
      if (!reminders || reminders.length === 0) {
        // remove reminder
        if (existingReminder) {
          await tx.reminder.delete({
            where: { id: existingReminder.id }
          })
        }
      } else {
        const newAt = new Date(reminders[0].at)

        if (existingReminder) {
          // update reminder
          await tx.reminder.update({
            where: { id: existingReminder.id },
            data: {
              at: newAt,
              emailed: false // reset if edited
            }
          })
        } else {
          // create reminder
          await tx.reminder.create({
            data: {
              noteId,
              at: newAt
            }
          })
        }
      }
    })

    res.json({ message: 'Note updated successfully' })
  } catch (err) {
    console.error(err)
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
