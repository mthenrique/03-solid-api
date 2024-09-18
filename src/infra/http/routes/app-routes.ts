import { authRoutes } from "@/modules/authentication/infra/http/routes/auth-routes";
import { FastifyInstance } from "fastify";

export async function appRoutes(app: FastifyInstance) {
  app.register(authRoutes, { prefix: '/auth' })
}