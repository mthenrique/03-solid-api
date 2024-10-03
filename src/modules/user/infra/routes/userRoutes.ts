import { FastifyInstance } from "fastify";
import { GetUserProfileController } from "../controllers/get-user-profile-controller";
import GetUserMetricsController from "../controllers/get-user-metrics-controller";

export async function userRoutes(app: FastifyInstance) {
  const getUserProfileController = new GetUserProfileController()
  const getUserMetricsController = new GetUserMetricsController()

  app.get('/profile', getUserProfileController.handle)
  app.get('/metrics', getUserMetricsController.handle)
}