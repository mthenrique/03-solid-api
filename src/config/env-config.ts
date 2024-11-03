import ParameterStorageProviderType from '@/enum/parameter-storage-provider-type'
import ParameterValidateProviderType from '@/enum/parameter-validate-provider-type'

export interface IParameterConfig {
  parameterValidateProvider: ParameterValidateProviderType
  parameterStorageProvider: ParameterStorageProviderType
  parameterKey: string
}

export default {
  parameterValidateProvider:
    process.env.PARAMETER_VALIDATE_PROVIDER ||
    ParameterValidateProviderType.ZOD,
  parameterStorageProvider:
    process.env.PARAMETER_STORAGE_PROVIDER ||
    ParameterStorageProviderType.LOCAL,
  parameterKey: 'parameters',
} as IParameterConfig
