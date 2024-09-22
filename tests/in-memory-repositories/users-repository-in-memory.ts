import { ICreateUserDTO } from "@/infra/database/repositories/dtos/users/i-create-user-dto";
import { IUserDTO, IUserWithPasswordDTO } from "@/infra/database/repositories/dtos/users/i-user-dto";
import { UsersRepository } from "@/infra/database/repositories/users-repository";

class UsersRepositoryInMemory implements UsersRepository {
  private users: IUserWithPasswordDTO[] = []

  async create(data: ICreateUserDTO): Promise<IUserDTO> {
    this.users.push({
      id: 'uuid',
      passwordHash: data.passwordHash,
      email: data.email,
      name: data.name,
      createdAt: new Date()
    })

    const user = this.users[0]

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    }
  }

  async findByEmailWithPassword(email: string): Promise<IUserWithPasswordDTO | null> {
    
    const user = this.users.find(user => user.email === email)

    return user ?? null
  }

  async findByEmail(email: string): Promise<IUserDTO | null> {
    const user = this.users.find(user => user.email === email)

    if (!user) {
      return null
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    }
  }

  async findById(id: string): Promise<IUserDTO | null> {
    const user = this.users.find(user => user.id === id)

    if (!user) {
      return null
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    }
  }
}

export default UsersRepositoryInMemory