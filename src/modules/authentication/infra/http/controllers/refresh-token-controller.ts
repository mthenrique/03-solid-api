import { FastifyReply, FastifyRequest } from 'fastify'
import { ServerResponse } from 'http'

class RefreshTokenController {
  async handle(request: FastifyRequest, reply: FastifyReply<ServerResponse>) {
    await request.jwtVerify({ onlyCookie: true })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: request.user.sub,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: request.user.sub,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken)
      .status(200)
      .send({ token })
  }
}

export default RefreshTokenController
