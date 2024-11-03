import request from 'supertest'
import { app } from '@/infra/http/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { loadParameter } from '@/env'

describe('SignIn (e2e)', async () => {
  beforeAll(async () => {
    await loadParameter({ test: true })
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to sign-in a user', async () => {
    const responseSignUp = await request(app.server)
      .post('/auth/sign-up')
      .send({
        name: 'John Doe',
        email: 'z5nQs@example.com',
        password: '12345678',
      })

    expect(responseSignUp.statusCode).toEqual(201)

    const responseSignIn = await request(app.server)
      .post('/auth/sign-in')
      .send({
        email: 'z5nQs@example.com',
        password: '12345678',
      })

    expect(responseSignIn.statusCode).toEqual(200)
    expect(responseSignIn.body.user.email).toEqual('z5nQs@example.com')
    expect(responseSignIn.body.token).toEqual(expect.any(String))
  })
})
