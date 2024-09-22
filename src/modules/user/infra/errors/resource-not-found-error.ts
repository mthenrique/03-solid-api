import { AppError } from "@/infra/errors/app-error";

export class ResourceNotFoundError extends AppError {
  constructor(message: string) {
    super(message)
  }
}