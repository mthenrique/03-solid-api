export interface IUserWithPasswordDTO {
  id: string
  name: string
  email: string
  passwordHash: string
  createdAt: Date
}

export interface IUserDTO extends Omit<IUserWithPasswordDTO, 'passwordHash'> {}
