import ParametersError from '@/infra/errors/parameters-error'
import { z } from 'zod'
import GetUserMetricsFactory from '../../factories/get-user-metrics-factory'
import { FastifyReply, FastifyRequest } from 'fastify'

class GetUserMetricsController {
  public async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<Response> {
    // TODO: Implements token validation
    const { userId: nomValidatedUserId } = request

    const getUserMetricsBodySchema = z.object({
      userId: z.string().uuid(),
    })

    const body = getUserMetricsBodySchema.safeParse({
      userId: nomValidatedUserId,
    })

    if (!body.success) {
      throw new ParametersError(
        'Parameters validation error',
        body.error.format(),
      )
    }

    const { userId } = body.data

    const getUserMetricsFactory = new GetUserMetricsFactory()

    const metrics = await getUserMetricsFactory.make().execute({
      userId,
    })

    return reply.status(200).send({ metrics })
  }
}

export default GetUserMetricsController
