/* eslint-disable import/no-mutable-exports */

import * as dotenv from 'dotenv'

import { IParameterDTO } from './dtos/i-parameter-dto'

export let env: IParameterDTO

interface ILoadParameter {
  test: boolean
}

export async function loadParameter({ test }: ILoadParameter) {
  if (test) {
    dotenv.config({ path: '.env.test' })
  } else {
    dotenv.config()
  }

  env = await asyncLoadParameters()
}

async function asyncLoadParameters(): Promise<IParameterDTO> {
  const { default: ParameterFactory } = await import(
    './factories/parameter-factory'
  )

  return new Promise((resolve) => {
    const parameterFactory = new ParameterFactory()
    resolve(parameterFactory.getParameters())
  })
}
