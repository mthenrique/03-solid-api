import { ICreateGymDTO } from "./dtos/gyms/i-create-gym-dto"
import { IFindGymsByTitleDTO } from "./dtos/gyms/i-find-gyms-by-title-dto"
import { IGymDTO } from "./dtos/gyms/i-gym-dto"

export interface GymsRepository {
  create(data: ICreateGymDTO): Promise<IGymDTO>
  findById(id: string): Promise<IGymDTO | null>
  findGymsByTitle({query, page}: IFindGymsByTitleDTO): Promise<IGymDTO[]>
}