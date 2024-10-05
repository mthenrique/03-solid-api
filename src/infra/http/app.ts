import fastify from 'fastify'
import { appRoutes } from './routes/app-routes'
import { globalErrors } from './middlewares/global-errors'
import fastifyJwt from '@fastify/jwt'
import { env } from '@/envs'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET_KEY,
})
app.register(appRoutes)
app.setErrorHandler(globalErrors)
