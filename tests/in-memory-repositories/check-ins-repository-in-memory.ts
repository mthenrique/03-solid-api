import { CheckInsRepository } from "@/infra/database/repositories/check-ins-repository";
import { ICheckInDTO } from "@/infra/database/repositories/dtos/check-ins/i-check-in-dto";
import { ICreateCheckInDTO } from "@/infra/database/repositories/dtos/check-ins/i-create-check-in-dto";
import dayjs from "dayjs";
import { randomUUID } from "node:crypto";

class CheckInsRepositoryInMemory implements CheckInsRepository {
  public checkIns: ICheckInDTO[] = []

  async findById(checkInId: string): Promise<ICheckInDTO | null> {
    const checkIn = this.checkIns.find(checkIn => checkIn.id === checkInId)

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async create(data: ICreateCheckInDTO): Promise<ICheckInDTO> {
    const checkIn: ICheckInDTO = {
      id: randomUUID(),
      gymId: data.gymId,
      userId: data.userId,
      validatedAt: data.validatedAt ? new Date(data.validatedAt) : null,
      createdAt: new Date()
    }

    this.checkIns.push(checkIn)

    return {
      id: checkIn.id,
      userId: checkIn.userId,
      gymId: checkIn.gymId,
      createdAt: checkIn.createdAt
    }
  }

  async findByUserIdOnDate(userId: string, date: Date): Promise<ICheckInDTO | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn =  this.checkIns.find(checkIn => {
      const checkInDate = dayjs(checkIn.createdAt)
      const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.userId === userId && isOnSameDate
    })

    if (!checkIn) {
      return null
    }

    return {
      id: checkIn.id,
      userId: checkIn.userId,
      gymId: checkIn.gymId,
      createdAt: checkIn.createdAt
    }
  }

  async findManyByUserId(userId: string, page: number): Promise<ICheckInDTO[]> {
    return this.checkIns
      .filter(checkIn => checkIn.userId === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async countByUserId(userId: string): Promise<number> {
    return this.checkIns.filter(checkIn => checkIn.userId === userId).length
  }

  async save(checkIn: ICheckInDTO): Promise<ICheckInDTO> {
    const checkInIndex = this.checkIns.findIndex(item => item.id === checkIn.id)

    if (checkInIndex >= 0) {
      this.checkIns[checkInIndex] = checkIn
    }

    return checkIn
  }
}

export default CheckInsRepositoryInMemory