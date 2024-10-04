import { GymsRepository } from '@/infra/database/repositories/gyms-repository'
import { ExceptionError } from '@/infra/errors/exception-error'
import SearchGymsService from '@/modules/gym/services/search-gyms-service'
import GymsRepositoryInMemory from 'tests/in-memory-repositories/gyms-repository-in-memory'
import { describe, it, expect, beforeEach, vi } from 'vitest'

describe('SearchGymsService', () => {
  let gymsRepository: GymsRepository
  let searchGymsService: SearchGymsService

  beforeEach(() => {
    gymsRepository = new GymsRepositoryInMemory()
    searchGymsService = new SearchGymsService(gymsRepository)
  })

  it('should be able to search gyms', async () => {
    await gymsRepository.create({
      title: 'Gym 1',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await gymsRepository.create({
      title: 'Gym 2',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    const { gyms } = await searchGymsService.execute({
      query: 'Gym 1',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Gym 1' })])
  })

  it('should be able to search gyms with pagination', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Gym ${i}`,
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
      })
    }

    const { gyms } = await searchGymsService.execute({
      query: 'Gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gym 21' }),
      expect.objectContaining({ title: 'Gym 22' }),
    ])
  })

  it('should throw ExceptionError when unexpected error occurs', async () => {
    vi.spyOn(gymsRepository, 'findGymsByTitle').mockImplementationOnce(() => {
      throw new Error()
    })

    await expect(() =>
      searchGymsService.execute({
        query: 'Gym 1',
        page: 1,
      }),
    ).rejects.toBeInstanceOf(ExceptionError)
  })
})
