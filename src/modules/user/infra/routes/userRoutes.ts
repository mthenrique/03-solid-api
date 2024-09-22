import { FastifyInstance } from "fastify";
import { GetUserProfileController } from "../controllers/get-user-profile-controller";

export async function userRoutes(app: FastifyInstance) {
  const getUserProfileController = new GetUserProfileController()

  app.get('/profile', getUserProfileController.handle)
}