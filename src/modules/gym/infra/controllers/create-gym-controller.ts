import ParametersError from "@/infra/errors/parameters-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import CreateGymFactory from "../../factories/create-gym-factory";

class CreateGymController {
  public async handle(request: FastifyRequest, reply: FastifyReply) {

    const createGymBodySchema = z.object({
      title: z.string(),
      description: z.string().nullable().optional().default(null),
      phone: z.string().nullable().optional().default(null),
      latitude: z.number(),
      longitude: z.number()
    })

    const body = createGymBodySchema.safeParse(request.body)

    if (!body.success) {
      throw new ParametersError('Parameters validation error', body.error.format())
    }

    const {
      title,
      description,
      phone,
      latitude,
      longitude 
    } = body.data

    const createGymFactory = new CreateGymFactory()
    
    const gym = createGymFactory.make().execute({
      title,
      description,
      phone,
      latitude,
      longitude
    })

    return gym
  }
}

export default CreateGymController