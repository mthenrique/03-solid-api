import { ICreateUserDTO } from "./dtos/users/i-create-user-dto";
import { IUserDTO } from "./dtos/users/i-user-dto";

export interface UsersRepository {
  findByEmail(email: string): Promise<IUserDTO | null>
  create(data: ICreateUserDTO): Promise<IUserDTO>
}