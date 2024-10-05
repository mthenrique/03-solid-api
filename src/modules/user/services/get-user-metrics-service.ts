import { CheckInsRepository } from '@/infra/database/repositories/check-ins-repository'
import { ExceptionError } from '@/infra/errors/exception-error'
import { IGetUserMetricsResponse } from '../dtos/response/i-get-user-metrics-response'
import { IGetUserMetricsRequest } from '../dtos/request/i-get-user-metrics-request-dto'

class GetUserMetricsService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: IGetUserMetricsRequest): Promise<IGetUserMetricsResponse> {
    try {
      const checkInsCount = await this.checkInsRepository.countByUserId(userId)

      return {
        checkInsCount,
      }
    } catch (error) {
      throw new ExceptionError('Get user metrics error', error)
    }
  }
}

export default GetUserMetricsService
