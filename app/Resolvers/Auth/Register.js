'use strict'

const registerRules = use('App/Rules/Auth/RegisterRules')
const { validateAll } = use('Validator')
const GraphQLError = use('Adonis/Addons/GraphQLError')
const User = use('App/Models/User')

const createUserAfterValidation = input => validation => {
  if (validation.fails()) {
    throw new GraphQLError('Validation Failed', validation.messages())
  }

  const { passwordConfirm, ...userData } = input
  return User.create(userData)
}

const registerUser = (_, { input }) =>
  validateAll({ ...input }, registerRules)
    .then(createUserAfterValidation(input))
    .then(() => 'User registred successfully.')

module.exports = {
  Mutation: {
    registerUser
  }
}
