import { FastifyInstance } from "fastify";
import { SignUpController } from "../controllers/sign-up-controller";

export async function authRoutes(app: FastifyInstance) {

  const signUpController = new SignUpController()

  app.post('/sign-up', signUpController.handle)
}