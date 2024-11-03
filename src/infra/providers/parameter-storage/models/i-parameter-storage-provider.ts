export interface IParameterStorageProvider {
  getParameters(): Promise<NodeJS.ProcessEnv>
}
