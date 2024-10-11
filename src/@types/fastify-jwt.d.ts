import { Role } from '@/enum/role-type'
import '@fastify/jwt'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sub: string
      role: Role
    }
  }
}
