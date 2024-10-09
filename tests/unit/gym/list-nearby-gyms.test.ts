import { GymsRepository } from '@/infra/database/repositories/gyms-repository'
import { ExceptionError } from '@/infra/errors/exception-error'
import ListNearByGymsService from '@/modules/gym/services/list-nearby-gyms-service'
import GymsRepositoryInMemory from 'tests/in-memory-repositories/gyms-repository-in-memory'
import { describe, it, expect, beforeEach, vi } from 'vitest'

describe('ListNearbyGymsService', () => {
  let gymsRepository: GymsRepository
  let listNearbyGymsService: ListNearByGymsService

  beforeEach(() => {
    gymsRepository = new GymsRepositoryInMemory()
    listNearbyGymsService = new ListNearByGymsService(gymsRepository)
  })

  it('should be able to list nearby gyms', async () => {
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
      latitude: -26.2092052,
      longitude: -49.6401091,
    })

    const { gyms } = await listNearbyGymsService.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Gym 1' })])
  })

  it('should throw ExceptionError when unexpected error occurs', async () => {
    vi.spyOn(gymsRepository, 'findManyNearby').mockImplementationOnce(() => {
      throw new Error()
    })

    await expect(() =>
      listNearbyGymsService.execute({
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      }),
    ).rejects.toBeInstanceOf(ExceptionError)
  })
})
