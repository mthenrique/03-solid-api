import { FastifyInstance } from "fastify";
import CreateGymController from "../controllers/create-gym-controller";


export async function gymRoutes(app: FastifyInstance) {
  const createGymController = new CreateGymController()

  // TODO: Implements authentication
  app.post('/gym', createGymController.handle)
}