import { ICreateGymDTO } from "./dtos/gyms/i-create-gym-dto"
import { IFindGymsByTitleDTO } from "./dtos/gyms/i-find-gyms-by-title-dto"
import { IFindNearbyGymsDTO } from "./dtos/gyms/i-find-nearby-gyms-dto"
import { IGymDTO } from "./dtos/gyms/i-gym-dto"

export interface GymsRepository {
  create(data: ICreateGymDTO): Promise<IGymDTO>
  findById(id: string): Promise<IGymDTO | null>
  findGymsByTitle({query, page}: IFindGymsByTitleDTO): Promise<IGymDTO[]>
  findManyNearby(data: IFindNearbyGymsDTO): Promise<IGymDTO[]>
}