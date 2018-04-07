'use strict'

const { test, trait, after } = use('Test/Suite')('Auth')
const User = use('App/Models/User')
const Token = use('App/Models/Token')

trait('Test/ApiClient')
trait('Auth/Client')

after(async () => {
  await Token.query().delete()
  await User.query().delete()
})

test('register user', async ({ client, assert }) => {
  const query = `mutation($input: RegisterInput!) {
    registerUser (input: $input)
  }`
  const variables = {
    input: {
      email: 'test@test.com',
      username: 'test',
      password: 'test1234',
      passwordConfirm: 'test1234'
    }
  }

  const response = await client
    .post('/graphql')
    .send({ query, variables })
    .end()

  response.assertStatus(200)
  const { registerUser } = JSON.parse(response.text).data
  assert.equal('User registred successfully.', registerUser)
})

test('register user with fail', async ({ client, assert }) => {
  const query = `mutation($input: RegisterInput!) {
    registerUser (input: $input)
  }`
  const variables = {
    input: {
      email: 'test@test.com',
      username: 'test',
      password: 'test1234',
      passwordConfirm: 'test1234'
    }
  }

  const response = await client
    .post('/graphql')
    .send({ query, variables })
    .end()

  response.assertStatus(200)
  const error = JSON.parse(response.text).errors[0]
  assert.equal('Validation Failed', error.message)
  assert.equal('unique validation failed on username', error.state[0].message)
})
