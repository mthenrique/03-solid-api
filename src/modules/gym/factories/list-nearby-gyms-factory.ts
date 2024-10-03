import PrismaGymsRepository from "@/infra/database/repositories/prisma/prisma-gyms-repository"
import ListNearByGymsService from "../services/list-nearby-gyms-service"

class ListNearbyGymsFactory {
  public make() {
    const gymsRepository = new PrismaGymsRepository()
    const listNearbyGymsService = new ListNearByGymsService(gymsRepository)

    return listNearbyGymsService
  }
}

export default ListNearbyGymsFactory