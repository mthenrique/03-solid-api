import { FastifyInstance } from 'fastify'
import { SignUpController } from '../controllers/sign-up-controller'
import SignInController from '../controllers/sign-in-controller'
import RefreshTokenController from '../controllers/refresh-token-controller'

export async function authRoutes(app: FastifyInstance) {
  const signUpController = new SignUpController()
  const signInController = new SignInController()
  const refreshTokenController = new RefreshTokenController()

  app.post('/sign-up', signUpController.handle)
  app.post('/sign-in', signInController.handle)
  app.patch('/refresh-token', refreshTokenController.handle)
}
