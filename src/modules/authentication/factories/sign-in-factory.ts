import { PrismaUsersRepository } from '@/infra/database/repositories/prisma/prisma-users-repository'
import SignInService from '../services/sign-in-service'

class SignInFactory {
  public make() {
    const usersRepository = new PrismaUsersRepository()
    const signInService = new SignInService(usersRepository)

    return signInService
  }
}

export default SignInFactory
