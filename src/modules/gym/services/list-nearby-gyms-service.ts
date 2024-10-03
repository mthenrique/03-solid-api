import { IGymDTO } from "@/infra/database/repositories/dtos/gyms/i-gym-dto"
import { GymsRepository } from "@/infra/database/repositories/gyms-repository"
import { ExceptionError } from "@/infra/errors/exception-error"

interface IListNearByGymsServiceRequest {
  userLatitude: number
  userLongitude: number
}

interface IListNearByGymsServiceResponse {
  gyms: IGymDTO[]
}

class ListNearByGymsService {
  constructor(
    private gymsRepository: GymsRepository
  ) {}

  async execute({
    userLatitude,
    userLongitude
  }: IListNearByGymsServiceRequest): Promise<IListNearByGymsServiceResponse> {
    try {
      const gyms = await this.gymsRepository.findManyNearby({
        userLatitude,
        userLongitude
      })
  
      return {
        gyms
      }
    } catch (error) {
      throw new ExceptionError('List nearby gyms error', error)
    }
  }
}

export default ListNearByGymsService