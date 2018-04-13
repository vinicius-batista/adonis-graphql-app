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

const loginQuery = `mutation($input: LoginUserInput!) {
  loginUser (input: $input) {
    token,
    refreshToken
  }
}`

const registerQuery = `mutation($input: RegisterInput!) {
  registerUser (input: $input)
}`

test('register user', async ({ client, assert }) => {
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
    .send({ query: registerQuery, variables })
    .end()

  response.assertStatus(200)
  const { registerUser } = JSON.parse(response.text).data
  assert.equal('User registred successfully.', registerUser)
})

test('register user with fail', async ({ client, assert }) => {
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
    .send({ query: registerQuery, variables })
    .end()

  response.assertStatus(200)
  const error = JSON.parse(response.text).errors[0]
  assert.equal('Validation Failed', error.message)
  assert.equal('unique validation failed on username', error.state[0].message)
})

test('login user', async ({ client, assert }) => {
  const variables = {
    input: {
      email: 'test@test.com',
      password: 'test1234'
    }
  }

  const response = await client
    .post('/graphql')
    .send({ query: loginQuery, variables })
    .end()

  response.assertStatus(200)
  const { token, refreshToken } = JSON.parse(response.text).data.loginUser
  assert.exists(refreshToken)
  assert.exists(token)
})

test('login user with incorrect pass error', async ({ client, assert }) => {
  const variables = {
    input: {
      email: 'test@test.com',
      password: 'test123455'
    }
  }

  const response = await client
    .post('/graphql')
    .send({ query: loginQuery, variables })
    .end()

  response.assertStatus(200)
  const { message } = JSON.parse(response.text).errors[0]
  assert.equal(message, 'E_PASSWORD_MISMATCH: Cannot verify user password')
})

test('login user with incorrect email error', async ({ client, assert }) => {
  const variables = {
    input: {
      email: 'test123@test.com',
      password: 'test1234'
    }
  }

  const response = await client
    .post('/graphql')
    .send({ query: loginQuery, variables })
    .end()

  response.assertStatus(200)
  const { message } = JSON.parse(response.text).errors[0]
  assert.equal(message, 'E_USER_NOT_FOUND: Cannot find user with email as test123@test.com')
})
