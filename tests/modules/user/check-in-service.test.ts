import { CheckInsRepository } from "@/infra/database/repositories/check-ins-repository";
import { GymsRepository } from "@/infra/database/repositories/gyms-repository";
import { UsersRepository } from "@/infra/database/repositories/users-repository";
import { ExceptionError } from "@/infra/errors/exception-error";
import { ResourceNotFoundError } from "@/modules/user/infra/errors/resource-not-found-error";
import CheckInService from "@/modules/user/services/check-in-service";
import { hash } from "bcrypt";
import CheckInsRepositoryInMemory from "tests/in-memory-repositories/check-ins-repository-in-memory";
import GymsRepositoryInMemory from "tests/in-memory-repositories/gyms-repository-in-memory";
import UsersRepositoryInMemory from "tests/in-memory-repositories/users-repository-in-memory";
import { describe, it, expect, beforeEach, vi } from "vitest";

let usersRepository: UsersRepository
let gymsRepository: GymsRepository
let checkInsRepository: CheckInsRepository
let checkInService: CheckInService

describe('CheckInService', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory()
    gymsRepository = new GymsRepositoryInMemory()
    checkInsRepository = new CheckInsRepositoryInMemory()
    checkInService = new CheckInService(
      usersRepository,
      gymsRepository,
      checkInsRepository
    )
  })

  it('should be able to check in', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      passwordHash: await hash('password', 6)
    })

    const createdGym = await gymsRepository.create({
      description: 'Gym description',
      latitude: -27.2092052,
      longitude: -49.6401091,
      title: 'Gym',
      phone: '11999999999'
    })

    const checkIn = await checkInService.execute({
      userId: createdUser.id,
      gymId: createdGym.id,
      userLatitude: -27.2092052,
      userLongitude: -49.6401091
    })

    expect(checkIn).toHaveProperty('id')
    expect(checkIn.gymId).toEqual(createdGym.id)
    expect(checkIn.userId).toEqual(createdUser.id)
  })

  it('should not be able to check in on distant gym', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      passwordHash: await hash('password', 6)
    })

    const createdGym = await gymsRepository.create({
      description: 'Gym description',
      latitude: -25.516389,
      longitude: -49.1798828,
      title: 'Gym',
      phone: '11999999999'
    })

    await expect(() => checkInService.execute({
      userId: createdUser.id,
      gymId: createdGym.id,
      userLatitude: -25.5191711,
      userLongitude: -49.1910574
    })).rejects.toBeInstanceOf(ExceptionError)
  })

  it('should not be able to check in twice in the same day', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      passwordHash: await hash('password', 6)
    })

    const createdGym = await gymsRepository.create({
      description: 'Gym description',
      latitude: -27.2092052,
      longitude: -49.6401091,
      title: 'Gym',
      phone: '11999999999'
    })

    const checkIn = await checkInService.execute({
      userId: createdUser.id,
      gymId: createdGym.id,
      userLatitude: -27.2092052,
      userLongitude: -49.6401091
    })

    expect(checkIn).toHaveProperty('id')
    expect(checkIn.gymId).toEqual(createdGym.id)
    expect(checkIn.userId).toEqual(createdUser.id)

    await expect(() => checkInService.execute({
      userId: createdUser.id,
      gymId: createdGym.id,
      userLatitude: -27.2092052,
      userLongitude: -49.6401091
    })).rejects.toBeInstanceOf(ExceptionError)
  })

  it('should throw ResourceNotFoundError when user is not found', async () => {
    const createdGym = await gymsRepository.create({
      description: 'Gym description',
      latitude: -27.2092052,
      longitude: -49.6401091,
      title: 'Gym',
      phone: '11999999999'
    })

    await expect(() => checkInService.execute({
      userId: 'non-existing-user-id',
      gymId: createdGym.id,
      userLatitude: -27.2092052,
      userLongitude: -49.6401091
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should throw ResourceNotFoundError when gym is not found', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      passwordHash: await hash('password', 6)
    })

    await expect(() => checkInService.execute({
      userId: createdUser.id,
      gymId: 'non-existing-gym-id',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should throw ExceptionError when unexpected error occurs', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      passwordHash: await hash('password', 6)
    })

    const createdGym = await gymsRepository.create({
      description: 'Gym description',
      latitude: -27.2092052,
      longitude: -49.6401091,
      title: 'Gym',
      phone: '11999999999'
    })

    vi.spyOn(checkInsRepository, 'create').mockImplementationOnce(() => {
      throw new Error()
    })

    await expect(() => checkInService.execute({
      userId: createdUser.id,
      gymId: createdGym.id,
      userLatitude: -27.2092052,
      userLongitude: -49.6401091
    })).rejects.toBeInstanceOf(ExceptionError)
  })
})