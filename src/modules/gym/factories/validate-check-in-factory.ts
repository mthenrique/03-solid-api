import PrismaCheckInsRepository from '@/infra/database/repositories/prisma/prisma-check-ins-repository'
import ValidateCheckInService from '../services/validate-check-in-service'

class ValidateCheckInFactory {
  public make() {
    const checkInsRepository = new PrismaCheckInsRepository()
    const validateCheckInService = new ValidateCheckInService(
      checkInsRepository,
    )

    return validateCheckInService
  }
}

export default ValidateCheckInFactory
