import request from 'supertest'
import { app } from '@/infra/http/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('GetUserProfile(e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
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

    const { token } = responseSignIn.body

    const profileResponse = await request(app.server)
      .get('/user/profile')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)

    expect(profileResponse.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'John Doe',
        email: 'z5nQs@example.com',
      }),
    )
  })
})
