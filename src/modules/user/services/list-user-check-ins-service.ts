import { CheckInsRepository } from "@/infra/database/repositories/check-ins-repository"
import { ICheckInDTO } from "@/infra/database/repositories/dtos/check-ins/i-check-in-dto"
import { ExceptionError } from "@/infra/errors/exception-error"

interface IListUserCheckInsServiceRequest {
  userId: string
  page: number
}

interface IListUserCheckInsServiceResponse {
  checkIns: ICheckInDTO[]
}

class ListUserCheckInsService { 
  constructor(
    private checkInsRepository: CheckInsRepository
  ) {}

  async execute({ userId, page }: IListUserCheckInsServiceRequest): Promise<IListUserCheckInsServiceResponse> {
    try {
      const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

      return {
        checkIns
      }
    } catch (error) {
      throw new ExceptionError('List user check-ins error', error)
    }
  }

}

export default ListUserCheckInsService