import { PrismaUsersRepository } from '@/infra/database/repositories/prisma/prisma-users-repository'
import GetUserProfileService from '../services/get-user-profile-service'

class GetUserProfileFactory {
  public make() {
    const usersRepository = new PrismaUsersRepository()
    const getUserProfileService = new GetUserProfileService(usersRepository)

    return getUserProfileService
  }
}

export default GetUserProfileFactory
