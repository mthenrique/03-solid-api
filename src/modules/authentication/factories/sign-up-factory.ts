import { PrismaUsersRepository } from '@/infra/database/repositories/prisma/prisma-users-repository'
import SignUpService from '../services/sign-up-service'

class SignUpFactory {
  public make() {
    const usersRepository = new PrismaUsersRepository()
    const signUpService = new SignUpService(usersRepository)

    return signUpService
  }
}

export default SignUpFactory
