import { UsersRepository } from '@/infra/database/repositories/users-repository'
import { CheckInsRepository } from '@/infra/database/repositories/check-ins-repository'
import { ExceptionError } from '@/infra/errors/exception-error'
import { ResourceNotFoundError } from '../infra/errors/resource-not-found-error'
import { GymsRepository } from '@/infra/database/repositories/gyms-repository'
import { getDistanceBetweenCoordinates } from './utils/get-distance-between-coordinates'
import { env } from '@/env'
import { MaxNumberOfCheckInsReachedError } from '../infra/errors/max-number-of-check-ins-reached-error'
import { CheckInMaxDistanceReachedError } from '../infra/errors/check-in-max-distance-reached-error'
import { ICheckInResponse } from '../dtos/response/i-check-in-response-dto'
import { ICheckInRequest } from '../dtos/request/i-checkin-request-dto'

class CheckInService {
  constructor(
    private usersRepository: UsersRepository,
    private gymsRepository: GymsRepository,
    private checkInsRepository: CheckInsRepository,
  ) {}

  public async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
    validatedAt,
  }: ICheckInRequest): Promise<ICheckInResponse> {
    try {
      const user = await this.usersRepository.findById(userId)

      if (!user) {
        throw new ResourceNotFoundError('User not found')
      }

      const gym = await this.gymsRepository.findById(gymId)

      if (!gym) {
        throw new ResourceNotFoundError('gym not found')
      }

      const hasCheckInAvailable =
        await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

      if (hasCheckInAvailable) {
        throw new MaxNumberOfCheckInsReachedError()
      }

      const distance = getDistanceBetweenCoordinates(
        { latitude: userLatitude, longitude: userLongitude },
        { latitude: gym.latitude, longitude: gym.longitude },
      )

      if (distance > env.CHECk_IN_DISTANCE_IN_KM_TO_GYM) {
        throw new CheckInMaxDistanceReachedError()
      }

      const checkIn = await this.checkInsRepository.create({
        userId,
        gymId,
        validatedAt,
      })

      return {
        checkIn: {
          id: checkIn.id,
          userId: checkIn.userId,
          gymId: checkIn.gymId,
          createdAt: checkIn.createdAt,
          validatedAt: checkIn.validatedAt,
        },
      }
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        throw new ResourceNotFoundError(error.message)
      }

      if (error instanceof CheckInMaxDistanceReachedError) {
        throw new CheckInMaxDistanceReachedError()
      }

      if (error instanceof MaxNumberOfCheckInsReachedError) {
        throw new MaxNumberOfCheckInsReachedError()
      }

      throw new ExceptionError('Check-in error', error)
    }
  }
}

export default CheckInService
