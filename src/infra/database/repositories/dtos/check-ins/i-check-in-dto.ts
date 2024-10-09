export interface ICheckInDTO {
  id: string
  userId: string
  gymId: string
  createdAt: Date
  validatedAt?: Date | null
}
