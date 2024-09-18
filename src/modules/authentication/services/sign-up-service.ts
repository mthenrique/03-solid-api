import { ExceptionError } from "@/infra/errors/exception-error"
import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"

interface ISignUpServiceRequestDTO {
  name: string
  email: string
  password: string
}

class SignUpService {
  async execute({name, email, password}: ISignUpServiceRequestDTO): Promise<void> {
    try {
      const userAlreadyExists = await prisma.user.findUnique({
        where: {
          email
        }
      })
  
      if (userAlreadyExists) {
        throw new Error('User already exists')
      }
  
      const hashedPassword = await hash(password, 6)
  
      await prisma.user.create({
        data: {
          name,
          email,
          password_hash: hashedPassword
        }
      })
    } catch (error) {
      throw new ExceptionError('Sign up error', error)
    }
  }
}

export default SignUpService