import PrismaGymsRepository from "@/infra/database/repositories/prisma/prisma-gyms-repository"
import CreateGymService from "../services/create-gym-service"

class CreateGymFactory {
  public make() {
    const gymsRepository = new PrismaGymsRepository()
    const createGymService = new CreateGymService(gymsRepository)

    return createGymService
  }
}

export default CreateGymFactory