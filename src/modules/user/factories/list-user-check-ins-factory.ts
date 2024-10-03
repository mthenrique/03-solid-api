import PrismaCheckInsRepository from "@/infra/database/repositories/prisma/prisma-check-ins-repository"
import ListUserCheckInsService from "../services/list-user-check-ins-service"

class ListUserCheckInsFactory {
  public make() {
    const checkInsRepository = new PrismaCheckInsRepository()
    const listUserCheckInsService = new ListUserCheckInsService(checkInsRepository)

    return listUserCheckInsService
  }
}

export default ListUserCheckInsFactory