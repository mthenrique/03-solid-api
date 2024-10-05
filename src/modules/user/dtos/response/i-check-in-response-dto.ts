import { ICheckInDTO } from '@/infra/database/repositories/dtos/check-ins/i-check-in-dto'

export interface ICheckInResponse {
  checkIn: ICheckInDTO
}
