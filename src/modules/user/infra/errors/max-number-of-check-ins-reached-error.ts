import { AppError } from '@/infra/errors/app-error'

export class MaxNumberOfCheckInsReachedError extends AppError {
  constructor() {
    super('Max number of check-ins reached')
  }
}
