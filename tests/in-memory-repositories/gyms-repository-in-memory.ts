import { ICreateGymDTO } from '@/infra/database/repositories/dtos/gyms/i-create-gym-dto'
import { IFindGymsByTitleDTO } from '@/infra/database/repositories/dtos/gyms/i-find-gyms-by-title-dto'
import { IFindNearbyGymsDTO } from '@/infra/database/repositories/dtos/gyms/i-find-nearby-gyms-dto'
import { IGymDTO } from '@/infra/database/repositories/dtos/gyms/i-gym-dto'
import { GymsRepository } from '@/infra/database/repositories/gyms-repository'
import { getDistanceBetweenCoordinates } from '@/modules/user/services/utils/get-distance-between-coordinates'
import { randomUUID } from 'node:crypto'

class GymsRepositoryInMemory implements GymsRepository {
  private gyms: IGymDTO[] = []

  async create(data: ICreateGymDTO): Promise<IGymDTO> {
    const gym: IGymDTO = {
      id: randomUUID(),
      title: data.title,
      description: data.description,
      latitude: data.latitude,
      longitude: data.longitude,
      phone: data.phone ?? null,
      createdAt: new Date(),
    }

    this.gyms.push(gym)

    return {
      id: gym.id,
      title: gym.title,
      description: gym.description,
      phone: gym.phone,
      latitude: gym.latitude,
      longitude: gym.longitude,
      createdAt: gym.createdAt,
    }
  }

  async findById(id: string): Promise<IGymDTO | null> {
    const gym = this.gyms.find((gym) => gym.id === id)

    if (!gym) {
      return null
    }

    return {
      id: gym.id,
      title: gym.title,
      description: gym.description,
      phone: gym.phone,
      latitude: gym.latitude,
      longitude: gym.longitude,
      createdAt: gym.createdAt,
    }
  }

  async findGymsByTitle({
    query,
    page,
  }: IFindGymsByTitleDTO): Promise<IGymDTO[]> {
    const gyms = this.gyms
      .filter((gym) => gym.title.includes(query))
      .slice((page - 1) * 20, page * 20)

    return gyms
  }

  async findManyNearby(data: IFindNearbyGymsDTO): Promise<IGymDTO[]> {
    const gyms = this.gyms.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: data.userLatitude,
          longitude: data.userLongitude,
        },
        {
          latitude: gym.latitude,
          longitude: gym.longitude,
        },
      )

      return distance < 10
    })

    return gyms
  }
}

export default GymsRepositoryInMemory
// test husky
