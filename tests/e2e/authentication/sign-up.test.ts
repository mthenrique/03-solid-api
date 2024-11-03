import request from 'supertest'
import { app } from '@/infra/http/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { loadParameter } from '@/env'

describe('SignUp (e2e)', async () => {
  beforeAll(async () => {
    await loadParameter({ test: true })
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to sign-up a user', async () => {
    const response = await request(app.server).post('/auth/sign-up').send({
      name: 'John Doe',
      email: 'z5nQs@example.com',
      password: '12345678',
    })

    expect(response.statusCode).toEqual(201)
  })
})
