import { z } from 'zod'
import GetUserProfileFactory from '../../factories/get-user-profile-factory'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ParametersError } from '@/infra/errors/parameters-error'

class GetUserProfileController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    await request.jwtVerify()

    const { sub: nonValidatedUserId } = request.user

    const getUserProfileBodySchema = z.object({
      userId: z.string().uuid(),
    })

    const body = getUserProfileBodySchema.safeParse({
      userId: nonValidatedUserId,
    })

    if (!body.success) {
      throw new ParametersError(
        'Parameters validation error',
        body.error.format(),
      )
    }

    const { userId } = body.data

    const getUserProfileFactory = new GetUserProfileFactory()
    const userProfile = await getUserProfileFactory.make().execute({
      userId,
    })

    return reply.status(200).send(userProfile)
  }
}

export { GetUserProfileController }
