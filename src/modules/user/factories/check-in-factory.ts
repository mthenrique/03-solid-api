import PrismaGymsRepository from '@/infra/database/repositories/prisma/prisma-gyms-repository'
import { PrismaUsersRepository } from '@/infra/database/repositories/prisma/prisma-users-repository'
import CheckInsRepositoryInMemory from 'tests/in-memory-repositories/check-ins-repository-in-memory'
import CheckInService from '../services/check-in-service'

class CheckInFactory {
  public make() {
    const usersRepository = new PrismaUsersRepository()
    const gymsRepository = new PrismaGymsRepository()
    const checkInsRepository = new CheckInsRepositoryInMemory()

    const checkInService = new CheckInService(
      usersRepository,
      gymsRepository,
      checkInsRepository,
    )

    return checkInService
  }
}

export default CheckInFactory
