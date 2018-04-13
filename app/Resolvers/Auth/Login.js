'use strict'

const loginUser = (_, { input: { email, password } }, { auth }) =>
  auth
    .withRefreshToken()
    .attempt(email, password)

module.exports = {
  Mutation: {
    loginUser
  }
}
