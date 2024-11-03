import { ParametersError } from '@/infra/errors/parameters-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import ValidateCheckInFactory from '../../factories/validate-check-in-factory'

class ValidateCheckInController {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const validateCheckInBodySchema = z.object({
      checkInId: z.string().uuid(),
    })

    const body = validateCheckInBodySchema.safeParse(request.params)

    if (!body.success) {
      throw new ParametersError(
        'Parameters validation error',
        body.error.format(),
      )
    }

    const { checkInId } = body.data

    const validateCheckInFactory = new ValidateCheckInFactory()

    const checkIn = await validateCheckInFactory.make().execute({
      checkInId,
    })

    return reply.status(204).send({
      checkIn,
    })
  }
}

export default ValidateCheckInController
