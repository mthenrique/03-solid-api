export interface ICheckInRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
  validatedAt?: Date | null
}
