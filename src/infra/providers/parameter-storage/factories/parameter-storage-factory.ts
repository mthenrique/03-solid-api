import envConfig from '@/config/env-config'
import LocalParameterStorageProvider from '../implementations/local-parameter-storage-provider'

const parameterStorageProviders = {
  local: new LocalParameterStorageProvider(),
}

class ParameterStorageFactory {
  public make() {
    return parameterStorageProviders[envConfig.parameterStorageProvider]
  }
}

export default ParameterStorageFactory
