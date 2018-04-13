'use strict'

const loginUser = (_, { input }, { auth }) => {
  const { email, password } = input
  return auth
    .withRefreshToken()
    .attempt(email, password)
}

module.exports = {
  Mutation: {
    loginUser
  }
}
