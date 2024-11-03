import { loadParameter } from '@/env'
import { CheckInsRepository } from '@/infra/database/repositories/check-ins-repository'
import { ExceptionError } from '@/infra/errors/exception-error'
import ListUserCheckInsService from '@/modules/user/services/list-user-check-ins-service'
import CheckInsRepositoryInMemory from 'tests/in-memory-repositories/check-ins-repository-in-memory'
import { describe, it, expect, beforeEach, vi, beforeAll } from 'vitest'

let checkInsRepository: CheckInsRepository
let checkInsService: ListUserCheckInsService

describe('ListUserCheckInsService', () => {
  beforeAll(async () => {
    await loadParameter({ test: true })
  })

  beforeEach(() => {
    checkInsRepository = new CheckInsRepositoryInMemory()
    checkInsService = new ListUserCheckInsService(checkInsRepository)
  })

  it('should be able to list check-ins by user', async () => {
    await checkInsRepository.create({
      userId: 'user-01',
      gymId: 'gym-01',
    })

    const createdCheckIn = await checkInsRepository.create({
      userId: 'user-01',
      gymId: 'gym-02',
      validatedAt: new Date(),
    })

    const { checkIns } = await checkInsService.execute({
      userId: createdCheckIn.userId,
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'gym-01' }),
      expect.objectContaining({ gymId: 'gym-02' }),
    ])
  })

  it('should be able to list paginated check-ins by user', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        userId: 'user-01',
        gymId: `gym-${i}`,
      })
    }

    const { checkIns } = await checkInsService.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'gym-21' }),
      expect.objectContaining({ gymId: 'gym-22' }),
    ])
  })

  it('should throw ExceptionError when unexpected error occurs', async () => {
    vi.spyOn(checkInsRepository, 'findManyByUserId').mockImplementationOnce(
      () => {
        throw new Error()
      },
    )

    await expect(() =>
      checkInsService.execute({
        userId: 'user-01',
        page: 1,
      }),
    ).rejects.toBeInstanceOf(ExceptionError)
  })
})
