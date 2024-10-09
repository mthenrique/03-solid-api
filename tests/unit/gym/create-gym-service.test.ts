import { GymsRepository } from '@/infra/database/repositories/gyms-repository'
import { ExceptionError } from '@/infra/errors/exception-error'
import CreateGymService from '@/modules/gym/services/create-gym-service'
import GymsRepositoryInMemory from 'tests/in-memory-repositories/gyms-repository-in-memory'
import { describe, it, expect, beforeEach, vi } from 'vitest'

let gymsRepository: GymsRepository
let createGymService: CreateGymService

describe('CreateGymService', () => {
  beforeEach(() => {
    gymsRepository = new GymsRepositoryInMemory()
    createGymService = new CreateGymService(gymsRepository)
  })

  it('should be able to create a gym', async () => {
    const gymData = {
      title: 'Gym',
      description: 'Gym description',
      phone: '11999999999',
      latitude: -25.516389,
      longitude: -49.1798828,
    }

    const createdGym = await createGymService.execute(gymData)

    expect(createdGym).toHaveProperty('id')
    expect(createdGym.title).toEqual(gymData.title)
    expect(createdGym.description).toEqual(gymData.description)
    expect(createdGym.phone).toEqual(gymData.phone)
    expect(createdGym.latitude).toEqual(gymData.latitude)
    expect(createdGym.longitude).toEqual(gymData.longitude)
  })

  it('should throw ExceptionError when unexpected error occurs', async () => {
    vi.spyOn(gymsRepository, 'create').mockImplementationOnce(() => {
      throw new Error()
    })

    await expect(() =>
      createGymService.execute({
        title: 'Gym',
        description: 'Gym description',
        phone: '11999999999',
        latitude: -25.516389,
        longitude: -49.1798828,
      }),
    ).rejects.toBeInstanceOf(ExceptionError)
  })
})
