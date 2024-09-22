import { AppError } from "@/infra/errors/app-error";

export class UserNotFoundError extends AppError {
  constructor() {
    super('User not found')
  }
}