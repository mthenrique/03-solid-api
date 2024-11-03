import { loadParameter } from '@/env'
import { CheckInsRepository } from '@/infra/database/repositories/check-ins-repository'
import { ExceptionError } from '@/infra/errors/exception-error'
import { LateCheckInValidationError } from '@/modules/gym/infra/errors/late-check-in-validation-error'
import ValidateCheckInService from '@/modules/gym/services/validate-check-in-service'
import { ResourceNotFoundError } from '@/modules/user/infra/errors/resource-not-found-error'
import CheckInsRepositoryInMemory from 'tests/in-memory-repositories/check-ins-repository-in-memory'
import {
  describe,
  it,
  expect,
  beforeEach,
  vi,
  afterEach,
  beforeAll,
} from 'vitest'

describe('ValidateCheckInService', () => {
  let checkInsRepository: CheckInsRepository
  let validateCheckInService: ValidateCheckInService

  beforeAll(async () => {
    await loadParameter({ test: true })
  })

  beforeEach(() => {
    checkInsRepository = new CheckInsRepositoryInMemory()
    validateCheckInService = new ValidateCheckInService(checkInsRepository)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    const { checkIn } = await validateCheckInService.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validatedAt).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      validateCheckInService.execute({
        checkInId: 'inexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate an already validated check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    await validateCheckInService.execute({
      checkInId: createdCheckIn.id,
    })

    await expect(() =>
      validateCheckInService.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate a check-in after 20 minutes of its creation', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21

    vi.useFakeTimers()
    vi.setSystemTime(new Date(Date.now() + twentyOneMinutesInMs))

    await expect(() =>
      validateCheckInService.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError)
  })

  it('should throw ExceptionError when unexpected error occurs', async () => {
    vi.spyOn(checkInsRepository, 'findById').mockImplementationOnce(() => {
      throw new Error()
    })

    await expect(() =>
      validateCheckInService.execute({
        checkInId: 'inexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ExceptionError)
  })
})
