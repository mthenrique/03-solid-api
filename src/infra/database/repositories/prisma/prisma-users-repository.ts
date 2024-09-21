import { prisma } from "@/lib/prisma"
import { ICreateUserDTO } from "../dtos/users/i-create-user-dto"
import { UsersRepository } from "../users-repository"
import { IUserDTO, IUserWithPasswordDTO } from "../dtos/users/i-user-dto"

class PrismaUsersRepository implements UsersRepository {
  async create({name, email, passwordHash}: ICreateUserDTO): Promise<IUserDTO> {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password_hash: passwordHash
      }
    })

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.created_at
    }
  }

  async findByEmailWithPassword(email: string): Promise<IUserWithPasswordDTO | null> {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      return null
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      passwordHash: user.password_hash,
      createdAt: user.created_at
    }
  }

  async findByEmail(email: string): Promise<IUserDTO | null> {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      return null
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.created_at
    }
  }
}

export { PrismaUsersRepository }