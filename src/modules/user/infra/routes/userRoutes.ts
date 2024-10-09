import { FastifyInstance } from 'fastify'
import { GetUserProfileController } from '../controllers/get-user-profile-controller'
import GetUserMetricsController from '../controllers/get-user-metrics-controller'
import ListUserCheckInsController from '../controllers/list-user-check-in-controller'
import { requireAuth } from '@/infra/http/middlewares/require-auth'
import CheckInController from '../controllers/check-in-controller'

export async function userRoutes(app: FastifyInstance) {
  const getUserProfileController = new GetUserProfileController()
  const listUserCheckInsController = new ListUserCheckInsController()
  const getUserMetricsController = new GetUserMetricsController()
  const checkInController = new CheckInController()

  app.get(
    '/profile',
    { preHandler: [requireAuth] },
    getUserProfileController.handle,
  )

  app.get(
    '/check-ins/history',
    { preHandler: [requireAuth] },
    listUserCheckInsController.handle,
  )

  app.get(
    '/metrics',
    { preHandler: [requireAuth] },
    getUserMetricsController.handle,
  )

  app.post('/check-in', { preHandler: [requireAuth] }, checkInController.handle)
}
