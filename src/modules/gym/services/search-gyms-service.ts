import { IGymDTO } from '@/infra/database/repositories/dtos/gyms/i-gym-dto'
import { GymsRepository } from '@/infra/database/repositories/gyms-repository'
import { ExceptionError } from '@/infra/errors/exception-error'

interface ISearchGymsServiceRequest {
  query: string
  page: number
}

interface ISearchGymsServiceResponse {
  gyms: IGymDTO[]
}

class SearchGymsService {
  constructor(private gymsRepository: GymsRepository) {}

  public async execute({
    query,
    page,
  }: ISearchGymsServiceRequest): Promise<ISearchGymsServiceResponse> {
    try {
      const gyms = await this.gymsRepository.findGymsByTitle({
        query,
        page,
      })

      return { gyms }
    } catch (error) {
      throw new ExceptionError('Search gyms error', error)
    }
  }
}

export default SearchGymsService
