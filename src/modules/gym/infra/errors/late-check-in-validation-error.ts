import { AppError } from "@/infra/errors/app-error";

export class LateCheckInValidationError extends AppError {
  constructor() {
    super('The check-in can only be validated until 20 minutes of its creation')
  }
}