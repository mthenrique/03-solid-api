import { prisma } from "@/lib/prisma";
import { CheckInsRepository } from "../check-ins-repository";
import { ICheckInDTO } from "../dtos/check-ins/i-check-in-dto";
import { ICreateCheckInDTO } from "../dtos/check-ins/i-create-check-in-dto";

class PrismaCheckInsRepository implements CheckInsRepository {
  async create({userId, gymId, validatedAt}: ICreateCheckInDTO): Promise<ICheckInDTO> {
    const checkIn = await prisma.checkIn.create({
      data: {
        gym_id: gymId,
        user_id: userId,
        validated_at: validatedAt
      }
    })

    return {
      id: checkIn.id,
      userId: checkIn.user_id,
      gymId: checkIn.gym_id,
      createdAt: checkIn.created_at
    }
  }

  async findByUserIdOnDate(userId: string, date: Date): Promise<ICheckInDTO | null> {
    const startOfTheDay = new Date(date.getFullYear(), date.getMonth(), date.getDate())

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay
        }
      }
    })

    if (!checkIn) {
      return null
    }

    return {
      id: checkIn?.id,
      gymId: checkIn?.gym_id,
      userId: checkIn?.user_id,
      createdAt: checkIn?.created_at
    }
  }

  async findManyByUserId(userId: string, page: number): Promise<ICheckInDTO[]> {
    const checkIns = (await prisma.checkIn.findMany({
      where: {
        user_id: userId
      },
      take: 20,
      skip: (page - 1) * 20
    })).map(checkIn => {
      return {
        id: checkIn.id,
        gymId: checkIn.gym_id,
        userId: checkIn.user_id,
        createdAt: checkIn.created_at
      }
    })

    return checkIns
  }

  async countByUserId(userId: string): Promise<number> {
    return await prisma.checkIn.count({
      where: {
        user_id: userId
      }
    })
  }

  async  findById(checkInId: string): Promise<ICheckInDTO | null> {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id: checkInId
      }
    })

    if (!checkIn) {
      return null
    }

    return {
      id: checkIn?.id,
      gymId: checkIn?.gym_id,
      userId: checkIn?.user_id,
      createdAt: checkIn?.created_at
    }
  }

  async save(checkIn: ICheckInDTO): Promise<ICheckInDTO> {
    const updatedCheckIn = await prisma.checkIn.update({
      data: {
        ...checkIn
      },
      where: {
        id: checkIn.id
      }
    })

    return {
      id: updatedCheckIn.id,
      gymId: updatedCheckIn.gym_id,
      userId: updatedCheckIn.user_id,
      createdAt: updatedCheckIn.created_at
    }

  }
}

export default PrismaCheckInsRepository