import pkg from '@prisma/client'
const { PrismaClient } = pkg

const prisma = new PrismaClient()

async function main () {
  const notes = await prisma.note.findMany()
  console.log(notes)
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => {
    console.error(e)
    prisma.$disconnect()
  })
