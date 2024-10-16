/* eslint-disable @typescript-eslint/no-explicit-any */
export default class ParametersError extends Error {
  declare parameters?: any

  constructor(message: string, parameters?: any) {
    super(message)
    this.name = 'ParametersError'
    this.parameters = parameters
  }
}
