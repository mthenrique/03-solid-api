import { UsersRepository } from "@/infra/database/repositories/users-repository"
import { ExceptionError } from "@/infra/errors/exception-error"
import { hash } from "bcryptjs"

interface ISignUpServiceRequestDTO {
  name: string
  email: string
  password: string
}

class SignUpService {
  constructor(
    private usersRepository: UsersRepository
  ) {}

  async execute({name, email, password}: ISignUpServiceRequestDTO): Promise<void> {
    try {
      const userAlreadyExists = await this.usersRepository.findByEmail(email)
  
      if (userAlreadyExists) {
        throw new Error('User already exists')
      }
  
      const hashedPassword = await hash(password, 6)
  
      await this.usersRepository.create({
        name,
        email,
        hashedPassword
      })
    } catch (error) {
      throw new ExceptionError('Sign up error', error)
    }
  }
}

export default SignUpService