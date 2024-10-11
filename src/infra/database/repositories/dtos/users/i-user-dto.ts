import { Role } from '@prisma/client'

export interface IUserWithPasswordDTO {
  id: string
  name: string
  email: string
  passwordHash: string
  role: Role
  createdAt: Date
}

export interface IUserDTO extends Omit<IUserWithPasswordDTO, 'passwordHash'> {}
