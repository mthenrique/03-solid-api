import fastify from 'fastify'
import { appRoutes } from './routes/app-routes'
import { globalErrors } from './middlewares/global-errors'
import fastifyJwt from '@fastify/jwt'
import { env } from '@/env'
import fastifyCookie from '@fastify/cookie'

function configServer() {
  const app = fastify()

  app.register(fastifyJwt, {
    secret: env.JWT_SECRET_KEY,
    cookie: {
      cookieName: 'refreshToken',
      signed: false,
    },
    sign: {
      expiresIn: '10m',
    },
  })
  app.register(fastifyCookie, {
    parseOptions: {
      path: '/',
      secure: true,
      sameSite: 'strict', // Altere para 'lax' ou 'none' se necessário
      httpOnly: true,
    },
  })
  app.register(appRoutes)
  app.setErrorHandler(globalErrors)

  return app
}

export const app = configServer()
