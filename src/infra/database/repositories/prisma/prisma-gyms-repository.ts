import { prisma } from '@/lib/prisma'
import { ICreateGymDTO } from '../dtos/gyms/i-create-gym-dto'
import { IGymDTO } from '../dtos/gyms/i-gym-dto'
import { GymsRepository } from '../gyms-repository'
import { IFindGymsByTitleDTO } from '../dtos/gyms/i-find-gyms-by-title-dto'
import { IFindNearbyGymsDTO } from '../dtos/gyms/i-find-nearby-gyms-dto'
import { Gym } from '@prisma/client'

class PrismaGymsRepository implements GymsRepository {
  async create(data: ICreateGymDTO): Promise<IGymDTO> {
    const gym = await prisma.gym.create({
      data: {
        title: data.title,
        description: data.description,
        phone: data.phone,
        latitude: data.latitude,
        longitude: data.longitude,
      },
    })

    return {
      id: gym.id,
      title: gym.title,
      description: gym.description,
      phone: gym.phone,
      latitude: Number(gym.latitude),
      longitude: Number(gym.longitude),
      createdAt: gym.created_at,
    }
  }

  async findById(id: string): Promise<IGymDTO | null> {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })

    if (!gym) {
      return null
    }

    return {
      id: gym.id,
      title: gym.title,
      description: gym.description,
      phone: gym.phone,
      latitude: Number(gym.latitude),
      longitude: Number(gym.longitude),
      createdAt: gym.created_at,
    }
  }

  async findGymsByTitle({
    query,
    page,
  }: IFindGymsByTitleDTO): Promise<IGymDTO[]> {
    const gyms = (
      await prisma.gym.findMany({
        where: {
          title: {
            contains: query,
          },
        },
        take: 20,
        skip: (page - 1) * 20,
      })
    ).map((gym) => {
      return {
        id: gym.id,
        title: gym.title,
        description: gym.description,
        phone: gym.phone,
        latitude: Number(gym.latitude),
        longitude: Number(gym.longitude),
        createdAt: gym.created_at,
      }
    })

    return gyms
  }

  async findManyNearby({
    userLatitude,
    userLongitude,
  }: IFindNearbyGymsDTO): Promise<IGymDTO[]> {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${userLatitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${userLongitude}) ) + sin( radians(${userLatitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    return gyms.map((gym) => {
      return {
        id: gym.id,
        title: gym.title,
        description: gym.description,
        phone: gym.phone,
        latitude: Number(gym.latitude),
        longitude: Number(gym.longitude),
        createdAt: gym.created_at,
      }
    })
  }
}

export default PrismaGymsRepository
