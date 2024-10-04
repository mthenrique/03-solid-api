import PrismaCheckInsRepository from '@/infra/database/repositories/prisma/prisma-check-ins-repository'
import GetUserMetricsService from '../services/get-user-metrics-service'

class GetUserMetricsFactory {
  public make() {
    const checkInsRepository = new PrismaCheckInsRepository()
    const getUserMetricsService = new GetUserMetricsService(checkInsRepository)

    return getUserMetricsService
  }
}

export default GetUserMetricsFactory
