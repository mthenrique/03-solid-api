import { FastifyInstance } from 'fastify'
import CreateGymController from '../controllers/create-gym-controller'
import ListNearbyGymsController from '../controllers/list-nearby-gyms-controller'
import SearchGymsController from '../controllers/search-gyms-controller'
import ValidateCheckInController from '../controllers/validate-check-in-controller'
import { requireAuth } from '@/infra/http/middlewares/require-auth'
import { verifyUserRole } from '@/infra/http/middlewares/verify-user-role'
import { Role } from '@/enum/role-type'

export async function gymRoutes(app: FastifyInstance) {
  const createGymController = new CreateGymController()
  const searchGymsController = new SearchGymsController()
  const listNearbyGymsController = new ListNearbyGymsController()
  const validateCheckInController = new ValidateCheckInController()

  app.post(
    '/',
    { preHandler: [requireAuth, verifyUserRole(Role.ADMIN)] },
    createGymController.handle,
  )
  app.post(
    '/validate/check-in',
    { preHandler: [requireAuth, verifyUserRole(Role.ADMIN)] },
    validateCheckInController.handle,
  )

  app.get('/', { preHandler: [requireAuth] }, searchGymsController.handle)
  app.get(
    '/nearby',
    { preHandler: [requireAuth] },
    listNearbyGymsController.handle,
  )
}
