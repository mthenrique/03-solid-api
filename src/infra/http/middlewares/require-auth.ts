import { FastifyReply, FastifyRequest } from 'fastify'
import { ServerResponse } from 'http'

export async function requireAuth(
  request: FastifyRequest,
  reply: FastifyReply<ServerResponse>,
) {
  try {
    await request.jwtVerify()
  } catch (err) {
    console.log('Error: ', err)
    reply.status(401).send({
      statusCode: 401,
      error: 'Unauthorized',
      message: 'Token missing or invalid',
    })
  }
}
