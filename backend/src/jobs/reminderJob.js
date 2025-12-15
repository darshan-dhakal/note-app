// jobs/reminderJob.js
import cron from 'node-cron'
import prisma from '../config/prisma.js'
import { sendEmail } from '../../utils/email.js'

// Runs every minute
cron.schedule('* * * * *', async () => {
  console.log('Checking for reminders...')
  try {
    const now = new Date()

    const reminders = await prisma.reminder.findMany({
      where: {
        emailed: false,
        at: { lte: now } // due reminders
      },
      include: { note: { include: { user: true } } }
    })

    for (const r of reminders) {
      if (!r.note.user) continue

      await sendEmail({
        to: r.note.user.email,
        subject: `Reminder: ${r.note.title}`,
        text: `You have a reminder for your note: "${r.note.title}" scheduled at ${r.at}`,
        html: `<p>You have a reminder for your note: <strong>${
          r.note.title
        }</strong></p><p>Scheduled at: ${new Date(r.at).toLocaleString()}</p>`
      })

      await prisma.reminder.update({
        where: { id: r.id },
        data: { emailed: true }
      })
    }
  } catch (err) {
    console.error('Reminder job error:', err)
  }
})
