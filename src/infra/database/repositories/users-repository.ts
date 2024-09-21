import { ICreateUserDTO } from "./dtos/users/i-create-user-dto";
import { IUserDTO, IUserWithPasswordDTO } from "./dtos/users/i-user-dto";

export interface UsersRepository {
  findByEmailWithPassword(email: string): Promise<IUserWithPasswordDTO | null>
  findByEmail(email: string): Promise<IUserDTO | null>
  create(data: ICreateUserDTO): Promise<IUserDTO>
}