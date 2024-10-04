import { CheckInsRepository } from "@/infra/database/repositories/check-ins-repository"
import { ICheckInDTO } from "@/infra/database/repositories/dtos/check-ins/i-check-in-dto"
import { ExceptionError } from "@/infra/errors/exception-error"
import { ResourceNotFoundError } from "@/modules/user/infra/errors/resource-not-found-error"
import dayjs from "dayjs"
import { LateCheckInValidationError } from "../infra/errors/late-check-in-validation-error"

interface IValidateCheckInServiceRequest {
  checkInId: string
}

interface IValidateCheckInServiceResponse {
  checkIn: ICheckInDTO
}

class ValidateCheckInService {
  constructor(
    private checkInsRepository: CheckInsRepository
  ) {}

  async execute({ checkInId }: IValidateCheckInServiceRequest): Promise<IValidateCheckInServiceResponse> {
    try {
      const checkIn = await this.checkInsRepository.findById(checkInId)

      if (!checkIn || checkIn.validatedAt) {
        throw new ResourceNotFoundError('Check-in not found')
      }

      const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(checkIn.createdAt, 'minutes')

      if (distanceInMinutesFromCheckInCreation > 20) {
        throw new LateCheckInValidationError()
      }

      checkIn.validatedAt = new Date()

      await this.checkInsRepository.save(checkIn)

      return {
        checkIn
      }
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        throw error
      }

      if (error instanceof LateCheckInValidationError) {
        throw error
      }

      throw new ExceptionError('Validate check-in error', error)
    }
  }
}

export default ValidateCheckInService