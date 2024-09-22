import { AppError } from "@/infra/errors/app-error";

export class InvalidCredentialError extends AppError {
  constructor() {
    super('Invalid credentials')
  }
}