import { FastifyReply, FastifyRequest } from 'fastify'

export async function requireAuth(
  request: FastifyRequest,
  reply: FastifyReply,
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
