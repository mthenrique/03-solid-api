import { PrismaUsersRepository } from "@/infra/database/repositories/prisma/prisma-users-repository"
import SignUpService from "@/modules/authentication/services/sign-up-service"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

class SignUpController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const signUpBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(8)
    })

    const body = signUpBodySchema.safeParse(request.body)

    if (!body.success) {
      throw new Error('Parameters validation error')
    }

    const { name, email, password } = body.data

    const usersRepository = new PrismaUsersRepository()
    const signUpService = new SignUpService(usersRepository)

    await signUpService.execute({
      name,
      email,
      password
    })

    reply.status(201)
  }
}

export { SignUpController }