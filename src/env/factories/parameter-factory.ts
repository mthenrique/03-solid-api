import envConfig from '@/config/env-config';
import ParameterStorageFactory from '@/infra/providers/parameter-storage/factories/parameter-storage-factory';

import { IParameterDTO } from '../dtos/i-parameter-dto';
import ZodParameterValidateProvider from '../providers/parameter-validate-provider/implementations/zod-parameter-validate-provider';

const parameterValidateProvider = {
  zod: new ZodParameterValidateProvider(),
};

class ParameterFactory {
  public async getParameters(): Promise<IParameterDTO> {
    const parameterStorageProvider = new ParameterStorageFactory().make();
    const _parameters = await parameterStorageProvider.getParameters();

    return parameterValidateProvider[
      envConfig.parameterValidateProvider
    ].validateAndFormatParameters(_parameters);
  }
}

export default ParameterFactory;
