import { z } from "zod"
import GetUserProfileFactory from "../../factories/get-user-profile-factory"
import ParametersError from "@/infra/errors/parameters-error"

class GetUserProfileController {
  async handle(request: any, reply: any) {
    const getUserProfileBodySchema = z.object({
      userId: z.string().uuid()
    })

    const body = getUserProfileBodySchema.safeParse(request.params)

    if (!body.success) {
      throw new ParametersError('Parameters validation error', body.error.format())
    }
    

    const { userId } = body.data

    const getUserProfileFactory = new GetUserProfileFactory()
    const userProfile = await getUserProfileFactory.make().execute({
      userId
    })

    return reply.status(200).send(userProfile)
  }
}

export { GetUserProfileController }