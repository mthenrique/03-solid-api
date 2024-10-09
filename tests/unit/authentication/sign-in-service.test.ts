import { beforeEach, describe, expect, it, vi } from 'vitest'
import { hash } from 'bcrypt'
import { ExceptionError } from '@/infra/errors/exception-error'
import SignInService from '@/modules/authentication/services/sign-in-service'
import { InvalidCredentialError } from '@/modules/authentication/infra/errors/invalid-credential-error'
import UsersRepositoryInMemory from 'tests/in-memory-repositories/users-repository-in-memory'

let userRepositoryInMemory: UsersRepositoryInMemory
let signInService: SignInService

describe('SignInService', async () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory()
    signInService = new SignInService(userRepositoryInMemory)
  })

  it('should sign in successfully with valid credentials', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password',
    }

    const passwordHash = await hash('password', 6)

    await userRepositoryInMemory.create({
      name: userData.name,
      email: userData.email,
      passwordHash,
    })

    const result = await signInService.execute({
      email: userData.email,
      password: userData.password,
    })

    expect(result.user.email).toEqual(userData.email)
    expect(result.user.name).toEqual(userData.name)
  })

  it('should throw InvalidCredentialError with invalid email', async () => {
    await expect(
      signInService.execute({
        email: 'invalid.email@example.com',
        password: 'password',
      }),
    ).rejects.toThrow(InvalidCredentialError)
  })

  it('should throw InvalidCredentialError with invalid password', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password',
    }

    const passwordHash = await hash('password', 6)

    await userRepositoryInMemory.create({
      name: userData.name,
      email: userData.email,
      passwordHash,
    })

    await expect(
      signInService.execute({
        email: userData.email,
        password: 'wrongPassword',
      }),
    ).rejects.toThrow(InvalidCredentialError)
  })

  it('should throw ExceptionError with unknown error', async () => {
    vi.spyOn(
      userRepositoryInMemory,
      'findByEmailWithPassword',
    ).mockRejectedValueOnce(new Error('Unknown error'))

    await expect(
      signInService.execute({
        email: 'john.doe@example.com',
        password: 'password',
      }),
    ).rejects.toThrow(ExceptionError)
  })
})
