import { IGymDTO } from "@/infra/database/repositories/dtos/gyms/i-gym-dto";
import { GymsRepository } from "@/infra/database/repositories/gyms-repository";
import { ExceptionError } from "@/infra/errors/exception-error";
import { prisma } from "@/lib/prisma";

interface ICreateGymServiceRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

class CreateGymService {
  constructor(
    private gymsRepository: GymsRepository
  ) {}

  public async execute({ title, description, phone, latitude, longitude }: ICreateGymServiceRequest): Promise<IGymDTO> {
    try {
      const gym = await this.gymsRepository.create({
        title,
        description,
        phone,
        latitude,
        longitude
      })
  
      return gym  
    } catch (error) {
      throw new ExceptionError('Create gym error', error)
    }
  }
}

export default CreateGymService