import { UsersRepository } from "@/infra/database/repositories/users-repository";
import { compare } from "bcrypt";
import { InvalidCredentialError } from "../infra/errors/invalid-credential-error";
import { ExceptionError } from "@/infra/errors/exception-error";
import { IUserDTO } from "@/infra/database/repositories/dtos/users/i-user-dto";

interface ISignInServiceRequestDTO {
  email: string
  password: string
}

interface ISignInServiceResponseDTO {
  user: IUserDTO
}

class SignInService {
  constructor(
    private usersRepository: UsersRepository
  ) {}

  async execute({email, password}: ISignInServiceRequestDTO): Promise<ISignInServiceResponseDTO> {
    try {
      const user = await this.usersRepository.findByEmailWithPassword(email)

      if (!user) {
        throw new InvalidCredentialError()
      }

      const isPasswordEqual = await compare(password, user.passwordHash)

      if (!isPasswordEqual) {
        throw new InvalidCredentialError()
      }

      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt
        }
      }

    } catch (error) {
      if (error instanceof InvalidCredentialError) {
        throw new InvalidCredentialError()
      } 

      throw new ExceptionError('Sign in error', error)
    }
  }
}

export default SignInService