import { PrismaUsersRepository } from "@/infra/database/repositories/prisma/prisma-users-repository";
import ParametersError from "@/infra/errors/parameters-error";
import SignInService from "@/modules/authentication/services/sign-in-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

class SignInController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const signInBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(8)
    })

    const body = signInBodySchema.safeParse(request.body)

    if (!body.success) {
      throw new ParametersError('Parameters validation error', body.error.format())
    }

    const { email, password } = body.data

    const userRepository = new PrismaUsersRepository()
    const signInService = new SignInService(userRepository)

    const { user } = await signInService.execute({
      email,
      password
    })

    return reply.status(200).send({ user })
  }
}

export default SignInController