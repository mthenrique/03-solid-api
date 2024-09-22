import { UsersRepository } from "@/infra/database/repositories/users-repository";
import { UserNotFoundError } from "../infra/errors/user-not-found-error";
import { ExceptionError } from "@/infra/errors/exception-error";
import { IUserDTO } from "@/infra/database/repositories/dtos/users/i-user-dto";

interface IGetUserProfileServiceRequest {
  userId: string
}

class GetUserProfileService {
  constructor(
    private usersRepository: UsersRepository
  ) {}

  async execute({ userId }: IGetUserProfileServiceRequest): Promise<IUserDTO> {
    try {
      const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    return user
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw new UserNotFoundError()
      }

      throw new ExceptionError('Get user profile error', error)
    }
  }
}

export default GetUserProfileService