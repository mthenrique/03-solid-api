import ParametersError from '@/infra/errors/parameters-error'
import { z } from 'zod'
import GetUserMetricsFactory from '../../factories/get-user-metrics-factory'
import { FastifyReply, FastifyRequest } from 'fastify'
import { IGetUserMetricsResponse } from '../../dtos/response/i-get-user-metrics-response'

class GetUserMetricsController {
  public async handle(
    request: FastifyRequest,
    reply: FastifyReply<IGetUserMetricsResponse>,
  ) {
    const { sub: nomValidatedUserId } = request.user

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
