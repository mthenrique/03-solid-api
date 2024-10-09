import { UsersRepository } from '@/infra/database/repositories/users-repository'
import { ExceptionError } from '@/infra/errors/exception-error'
import { UserNotFoundError } from '@/modules/user/infra/errors/user-not-found-error'
import GetUserProfileService from '@/modules/user/services/get-user-profile-service'
import { hash } from 'bcrypt'
import UsersRepositoryInMemory from 'tests/in-memory-repositories/users-repository-in-memory'
import { describe, it, expect, beforeEach, vi } from 'vitest'

let usersRepository: UsersRepository
let getUserProfileService: GetUserProfileService

describe('GetUserProfileService', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory()
    getUserProfileService = new GetUserProfileService(usersRepository)
  })

  it('should get user profile successfully', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      passwordHash: await hash('password', 6),
    })

    const result = await getUserProfileService.execute({
      userId: createdUser.id,
    })

    expect(result.id).toEqual(createdUser.id)
    expect(result.name).toEqual(createdUser.name)
    expect(result.email).toEqual(createdUser.email)
  })

  it('should throw UserNotFoundError when user is not found', async () => {
    await expect(
      getUserProfileService.execute({ userId: 'non-existent-user-id' }),
    ).rejects.toThrowError(UserNotFoundError)
  })

  it('should throw ExceptionError when unexpected error occurs', async () => {
    vi.spyOn(usersRepository, 'findById').mockImplementationOnce(() => {
      throw new Error()
    })

    await expect(
      getUserProfileService.execute({ userId: 'existing-user-id' }),
    ).rejects.toThrowError(ExceptionError)
  })
})
