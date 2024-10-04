import { FastifyInstance } from "fastify";
import CreateGymController from "../controllers/create-gym-controller";
import ListNearbyGymsController from "../controllers/list-nearby-gyms-controller";
import SearchGymsController from "../controllers/search-gyms-controller";
import ValidateCheckInController from "../controllers/validate-check-in-controller";


export async function gymRoutes(app: FastifyInstance) {
  const createGymController = new CreateGymController()
  const searchGymsController = new SearchGymsController()
  const listNearbyGymsController = new ListNearbyGymsController()
  const validateCheckInController = new ValidateCheckInController()

  // TODO: Implements authentication
  app.post('/', createGymController.handle)
  app.post('/validate/check-in', validateCheckInController.handle)

  app.get('/', searchGymsController.handle)
  app.get('/nearby', listNearbyGymsController.handle)
}