import ParametersError from '@/infra/errors/parameters-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import ListNearbyGymsFactory from '../../factories/list-nearby-gyms-factory'
import { IGymDTO } from '@/infra/database/repositories/dtos/gyms/i-gym-dto'

class ListNearbyGymsController {
  public async handle(
    request: FastifyRequest,
    reply: FastifyReply<{ gyms: IGymDTO }>,
  ) {
    const listNearbyGymsBodySchema = z.object({
      userLatitude: z.coerce.number(),
      userLongitude: z.coerce.number(),
    })

    const body = listNearbyGymsBodySchema.safeParse(request.query)

    if (!body.success) {
      throw new ParametersError(
        'Parameters validation error',
        body.error.format(),
      )
    }

    const { userLatitude, userLongitude } = body.data

    const listNearbyGymsFactory = new ListNearbyGymsFactory()

    const gyms = await listNearbyGymsFactory.make().execute({
      userLatitude,
      userLongitude,
    })

    return reply.status(200).send({ gyms })
  }
}

export default ListNearbyGymsController
