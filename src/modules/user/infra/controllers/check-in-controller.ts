import ParametersError from '@/infra/errors/parameters-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import CheckInFactory from '../../factories/check-in-factory'
import { ServerResponse } from 'http'

class CheckInController {
  async handle(request: FastifyRequest, reply: FastifyReply<ServerResponse>) {
    await request.jwtVerify()
    const { sub: nomValidatedUserId } = request.user

    const checkInBodySchema = z.object({
      userId: z.string().uuid(),
      gymId: z.string().uuid(),
      userLatitude: z.coerce.number(),
      userLongitude: z.coerce.number(),
      validatedAt: z.coerce.date().optional(),
    })

    const body = checkInBodySchema.safeParse({
      ...(typeof request.body === 'object' ? request.body : {}),
      ...(typeof request.params === 'object' ? request.params : {}),
      userId: nomValidatedUserId,
    })

    if (!body.success) {
      throw new ParametersError(
        'Parameters validation error',
        body.error.format(),
      )
    }

    const { userId, gymId, userLatitude, userLongitude, validatedAt } =
      body.data

    const checkInFactory = new CheckInFactory()
    const checkIn = await checkInFactory.make().execute({
      userId,
      gymId,
      validatedAt,
      userLatitude,
      userLongitude,
    })

    return reply.status(201).send(checkIn)
  }
}

export default CheckInController
