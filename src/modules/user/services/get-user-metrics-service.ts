import { CheckInsRepository } from "@/infra/database/repositories/check-ins-repository"
import { ExceptionError } from "@/infra/errors/exception-error"

interface IGetUserMetricsServiceRequest {
  userId: string
}

interface IGetUserMetricsServiceResponse {
  checkInsCount: number
}

class GetUserMetricsService {
  constructor(
    private checkInsRepository: CheckInsRepository
  ) {}

  async execute({ userId }: IGetUserMetricsServiceRequest): Promise<IGetUserMetricsServiceResponse> {
    try {
      const checkInsCount = await this.checkInsRepository.countByUserId(userId)

      return {
        checkInsCount
      }
    } catch (error) {
      throw new ExceptionError('Get user metrics error', error)
    }
  }
}

export default GetUserMetricsService