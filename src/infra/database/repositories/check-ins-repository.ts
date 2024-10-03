import { ICheckInDTO } from "./dtos/check-ins/i-check-in-dto";
import { ICreateCheckInDTO } from "./dtos/check-ins/i-create-check-in-dto";

export interface CheckInsRepository {
  create(data: ICreateCheckInDTO): Promise<ICheckInDTO>
  findByUserIdOnDate(userId: string, date: Date): Promise<ICheckInDTO | null>
  findManyByUserId(userId: string, page: number): Promise<ICheckInDTO[]>
  countByUserId(userId: string): Promise<number>
}