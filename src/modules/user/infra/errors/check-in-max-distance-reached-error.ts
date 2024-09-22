import { AppError } from "@/infra/errors/app-error";

export class CheckInMaxDistanceReachedError extends AppError {
  constructor() {
    super('Check-in max distance reached')
  }
}