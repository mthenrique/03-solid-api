import { FastifyInstance } from "fastify";
import CreateGymController from "../controllers/create-gym-controller";
import ListNearbyGymsController from "../controllers/list-nearby-gyms-controller";
import SearchGymsController from "../controllers/search-gyms-controller";


export async function gymRoutes(app: FastifyInstance) {
  const createGymController = new CreateGymController()
  const searchGymsController = new SearchGymsController()
  const listNearbyGymsController = new ListNearbyGymsController()

  // TODO: Implements authentication
  app.post('/gym', createGymController.handle)

  app.get('/gym', searchGymsController.handle)
  app.get('/gym/nearby', listNearbyGymsController.handle)
}