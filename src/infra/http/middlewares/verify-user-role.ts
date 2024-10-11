import { Role } from '@/enum/role-type'
import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyUserRole(roleToVerify: Role) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const role = request.user.role

      if (role !== roleToVerify) {
        reply.status(401).send({
          statusCode: 401,
          error: 'Unauthorized',
          message: 'You do not have permission to access this resource',
        })
      }
    } catch (err) {
      console.log('Error: ', err)
      reply.status(401).send({
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Token missing or invalid',
      })
    }
  }
}
