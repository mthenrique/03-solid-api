import ParametersError from '@/infra/errors/parameters-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import SearchGymsFactory from '../../factories/search-gyms-factory'

class SearchGymsController {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const searchGymsBodySchema = z.object({
      query: z.string(),
      page: z.coerce.number().min(1).default(1),
    })

    const body = searchGymsBodySchema.safeParse(request.query)

    if (!body.success) {
      throw new ParametersError(
        'Parameters validation error',
        body.error.format(),
      )
    }

    const { query, page } = body.data

    const searchGymsFactory = new SearchGymsFactory()

    const gyms = await searchGymsFactory.make().execute({
      query,
      page,
    })

    return reply.status(200).send({ gyms })
  }
}

export default SearchGymsController
