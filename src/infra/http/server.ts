import { env, loadParameter } from '@/env'

const main = async () => {
  await loadParameter({ test: false })

  const { app } = await import('@/infra/http/app')

  app
    .listen({
      port: env.PORT,
      host: '0.0.0.0',
    })
    .then(() => {
      console.log(`Server running on port ${env.PORT}`)
    })
}

main()
