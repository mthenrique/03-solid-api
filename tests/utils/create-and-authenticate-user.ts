import { Role } from '@/enum/role-type'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcrypt'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'z5nQs@example.com',
      password_hash: await hash('12345678', 6),
      role: isAdmin ? Role.ADMIN : Role.MEMBER,
    },
  })

  const signInResponse = await request(app.server).post('/auth/sign-in').send({
    email: 'z5nQs@example.com',
    password: '12345678',
  })

  return {
    user,
    token: signInResponse.body.token,
  }
}
