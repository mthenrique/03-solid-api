import ParametersError from '@/infra/errors/parameters-error'
import SignUpFactory from '@/modules/authentication/factories/sign-up-factory'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ServerResponse } from 'http'
import { z } from 'zod'

class SignUpController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply<ServerResponse>,
  ): Promise<void> {
    const signUpBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(8),
    })

    const body = signUpBodySchema.safeParse(request.body)

    if (!body.success) {
      throw new ParametersError(
        'Parameters validation error',
        body.error.format(),
      )
    }

    const { name, email, password } = body.data

    const signUpFactory = new SignUpFactory()
    await signUpFactory.make().execute({
      name,
      email,
      password,
    })

    reply.status(201)
  }
}

export { SignUpController }
