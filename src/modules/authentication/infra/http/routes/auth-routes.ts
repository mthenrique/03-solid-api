import { FastifyInstance } from 'fastify'
import { SignUpController } from '../controllers/sign-up-controller'
import SignInController from '../controllers/sign-in-controller'

export async function authRoutes(app: FastifyInstance) {
  const signUpController = new SignUpController()
  const signInController = new SignInController()

  app.post('/sign-up', signUpController.handle)
  app.post('/sign-in', signInController.handle)
}
