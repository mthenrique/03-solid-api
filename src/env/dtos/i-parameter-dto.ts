export interface IParameterDTO {
  NODE_ENV: 'test' | 'local' | 'development' | 'staging' | 'production'

  // Server
  PORT: number

  // Database
  DATABASE_URL: string

  // JWT
  JWT_SECRET_KEY: string

  // Check-in
  CHECk_IN_DISTANCE_IN_KM_TO_GYM: number
}
