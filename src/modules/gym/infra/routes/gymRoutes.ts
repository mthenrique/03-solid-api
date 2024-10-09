import { FastifyInstance } from 'fastify'
import CreateGymController from '../controllers/create-gym-controller'
import ListNearbyGymsController from '../controllers/list-nearby-gyms-controller'
import SearchGymsController from '../controllers/search-gyms-controller'
import ValidateCheckInController from '../controllers/validate-check-in-controller'
import { requireAuth } from '@/infra/http/middlewares/require-auth'

export async function gymRoutes(app: FastifyInstance) {
  const createGymController = new CreateGymController()
  const searchGymsController = new SearchGymsController()
  const listNearbyGymsController = new ListNearbyGymsController()
  const validateCheckInController = new ValidateCheckInController()

  app.post('/', { preHandler: [requireAuth] }, createGymController.handle)
  app.post(
    '/validate/check-in',
    { preHandler: [requireAuth] },
    validateCheckInController.handle,
  )

  app.get('/', { preHandler: [requireAuth] }, searchGymsController.handle)
  app.get(
    '/nearby',
    { preHandler: [requireAuth] },
    listNearbyGymsController.handle,
  )
}
