export interface IGymDTO {
  id: string
  title: string
  description?: string | null
  phone?: string | null
  latitude: number
  longitude: number
  createdAt: Date
}
