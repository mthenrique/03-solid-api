import { UsersRepository } from "@/infra/database/repositories/users-repository"
import { ExceptionError } from "@/infra/errors/exception-error"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "../infra/errors/user-already-exists-error"

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
        throw new UserAlreadyExistsError()
      }
  
      const passwordHash = await hash(password, 6)
  
      await this.usersRepository.create({
        name,
        email,
        passwordHash
      })
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        throw new UserAlreadyExistsError()
      }

      throw new ExceptionError('Sign up error', error)
    }
  }
}

export default SignUpService