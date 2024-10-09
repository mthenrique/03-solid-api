import { authRoutes } from '@/modules/authentication/infra/http/routes/auth-routes'
import { gymRoutes } from '@/modules/gym/infra/routes/gymRoutes'
import { userRoutes } from '@/modules/user/infra/routes/userRoutes'
import { FastifyInstance } from 'fastify'

export async function appRoutes(app: FastifyInstance) {
  app.register(authRoutes, { prefix: '/auth' })
  app.register(userRoutes, { prefix: '/user' })
  app.register(gymRoutes, { prefix: '/gym' })
}
