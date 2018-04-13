'use strict'

const { test, trait, after, before } = use('Test/Suite')('User')
const User = use('App/Models/User')

trait('Test/ApiClient')
trait('Auth/Client')

before(async () => {
  await User.create({
    email: 'test@test.com',
    username: 'testuser',
    password: '12345tes'
  })
})

after(async () => {
  await User.query().delete()
})

test('get own infos in query me', async ({ client, assert }) => {
  const user = await User.findBy('username', 'testuser')
  const query = `
    query {
      me {
      email,
      username
      }
    }
  `

  const response = await client
    .post('/graphql')
    .send({ query })
    .loginVia(user, 'jwt')
    .end()

  const { me } = JSON.parse(response.text).data
  response.assertStatus(200)

  const userData = {
    email: 'test@test.com',
    username: 'testuser'
  }
  assert.deepEqual(me, userData)
})
