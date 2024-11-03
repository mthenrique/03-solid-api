import { IParameterStorageProvider } from '../models/i-parameter-storage-provider'

class LocalParameterStorageProvider implements IParameterStorageProvider {
  public async getParameters(): Promise<NodeJS.ProcessEnv> {
    return process.env
  }
}

export default LocalParameterStorageProvider
