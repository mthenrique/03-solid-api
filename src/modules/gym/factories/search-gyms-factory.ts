import PrismaGymsRepository from "@/infra/database/repositories/prisma/prisma-gyms-repository"
import SearchGymsService from "../services/search-gyms-service"

class SearchGymsFactory {
  public make() {
    const gymsRepository = new PrismaGymsRepository()
    const searchGymsService = new SearchGymsService(gymsRepository)

    return searchGymsService
  }
}

export default SearchGymsFactory