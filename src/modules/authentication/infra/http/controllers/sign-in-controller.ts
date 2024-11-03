import { ParametersError } from '@/infra/errors/parameters-error'
import SignInFactory from '@/modules/authentication/factories/sign-in-factory'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

class SignInController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const signInBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(8),
    })

    const body = signInBodySchema.safeParse(request.body)

    if (!body.success) {
      throw new ParametersError(
        'Parameters validation error',
        body.error.format(),
      )
    }

    const { email, password } = body.data

    const signInFactory = new SignInFactory()

    const { user } = await signInFactory.make().execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken)
      .status(200)
      .send({ user, token })
  }
}

export default SignInController
