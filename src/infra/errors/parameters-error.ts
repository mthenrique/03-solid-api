export class ParametersError extends Error {
  public declare parameters: Record<string, unknown>

  constructor(message: string, parameters: Record<string, unknown>) {
    super(message)
    this.name = 'ParametersError'
    this.parameters = parameters
  }
}
