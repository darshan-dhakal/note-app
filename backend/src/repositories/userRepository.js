import prisma from '../config/prisma.js'

export const UserRepo = {
  createUser: userData => {
    return prisma.user.create({ data: userData })
  },
  findByEmail: email => {
    return prisma.user.findUnique({ where: { email } })
  },
  findById: id => {
    // console.log('Finding user by ID:', Number(id))
    return prisma.user.findUnique({ where: { id: Number(id) } })
  },
  findAll: () => {
    return prisma.user.findMany()
  },
  updateUser: (id, updateData) => {
    return prisma.user.update({
      where: { id: Number(id) },
      data: updateData
    })
  },
  deleteUser: id => {
    return prisma.user.delete({
      where: { id: Number(id) }
    })
  },
  getAge: id => {
    return prisma.user.findUnique({
      where: { id: Number(id) },
      select: { age: true }
    })
  }
}
