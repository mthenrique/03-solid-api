import ParametersError from "@/infra/errors/parameters-error"
import { z } from "zod"
import ListUserCheckInsFactory from "../../factories/list-user-check-ins-factory"

class ListUserCheckInsController {
  async handle(request: any, reply: any) {
    // TODO: Implements token validation
    const { userId: nomValidatedUserId } = request

    const listUserCheckInBodySchema = z.object({
      userId: z.string().uuid(),
      page: z.coerce.number().default(1)
    })

    const body = listUserCheckInBodySchema.safeParse({ nomValidatedUserId })

    if(!body.success) {
      throw new ParametersError('Parameters validation error', body.error.format())
    }

    const { userId, page } = body.data

    const listUserCheckInsFactory = new ListUserCheckInsFactory()
    const checkIns = await listUserCheckInsFactory.make().execute({
      userId,
      page
    })

    return reply.status(200).send({ checkIns })
  }
}

export default ListUserCheckInsController