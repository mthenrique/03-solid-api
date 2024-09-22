import { prisma } from "@/lib/prisma";
import { ICreateGymDTO } from "../dtos/gyms/i-create-gym-dto";
import { IGymDTO } from "../dtos/gyms/i-gym-dto";
import { GymsRepository } from "../gyms-repository";

class PrismaGymsRepository implements GymsRepository {
  async create(data: ICreateGymDTO): Promise<IGymDTO> {
    const gym = await prisma.gym.create({
      data: {
        title: data.title,
        description: data.description,
        phone: data.phone,
        latitude: data.latitude,
        longitude: data.longitude
      }
    })

    return {
      id: gym.id,
      title: gym.title,
      description: gym.description,
      phone: gym.phone,
      latitude: Number(gym.latitude),
      longitude: Number(gym.longitude),
      createdAt: gym.created_at
    }
  }

  async findById(id: string): Promise<IGymDTO | null> {
    const gym = await prisma.gym.findUnique({
      where: {
        id
      }
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
      createdAt: gym.created_at
    }
  }
}

export default PrismaGymsRepository