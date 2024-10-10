import request from 'supertest'
import { app } from '@/infra/http/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('RefreshToken (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    const signUpResponse = await request(app.server)
      .post('/auth/sign-up')
      .send({
        name: 'John Doe',
        email: 'z5nQs@example.com',
        password: '12345678',
      })

    expect(signUpResponse.statusCode).toEqual(201)

    const signInResponse = await request(app.server)
      .post('/auth/sign-in')
      .send({
        email: 'z5nQs@example.com',
        password: '12345678',
      })

    expect(signInResponse.statusCode).toEqual(200)

    const cookies = signInResponse.get('Set-Cookie')

    const refreshTokenResponse = await request(app.server)
      .patch('/auth/refresh-token')
      .set('Cookie', cookies)
      .send()

    expect(refreshTokenResponse.statusCode).toEqual(200)

    expect(refreshTokenResponse.get('Set-Cookie')).toEqual([expect.any(String)])

    expect(refreshTokenResponse.body).toEqual({
      token: expect.any(String),
    })
  })
})
