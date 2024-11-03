import { IParameterDTO } from '@/env/dtos/i-parameter-dto'
import { ParametersError } from '@/infra/errors/parameters-error'
import { z } from 'zod'

class ZodParameterValidateProvider {
  public validateAndFormatParameters(
    parameters: NodeJS.ProcessEnv,
  ): IParameterDTO {
    const parameterSchema = z.object({
      NODE_ENV: z
        .enum(['development', 'test', 'production'])
        .default('development'),
      PORT: z.coerce.number().default(3333),
      DATABASE_URL: z.string(),
      CHECk_IN_DISTANCE_IN_KM_TO_GYM: z.coerce.number().default(0.1),
      JWT_SECRET_KEY: z.string(),
    })

    const _parameter = parameterSchema.safeParse(parameters)

    if (!_parameter.success) {
      throw new ParametersError(
        'Error while validating parameters. Please check if all environment parameters are valid.',
        _parameter.error.flatten().fieldErrors,
      )
    }

    return _parameter.data
  }
}

export default ZodParameterValidateProvider
