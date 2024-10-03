import { FastifyInstance } from "fastify";
import { GetUserProfileController } from "../controllers/get-user-profile-controller";
import GetUserMetricsController from "../controllers/get-user-metrics-controller";
import ListUserCheckInsController from "../controllers/list-user-check-in-controller";

export async function userRoutes(app: FastifyInstance) {
  const getUserProfileController = new GetUserProfileController()
  const listUserCheckInsController = new ListUserCheckInsController()
  const getUserMetricsController = new GetUserMetricsController()

  app.get('/profile', getUserProfileController.handle)
  app.get('/check-ins/history', listUserCheckInsController.handle)
  app.get('/metrics', getUserMetricsController.handle)
}