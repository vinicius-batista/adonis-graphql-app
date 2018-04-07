'use strict'

const registerRules = use('App/Rules/Auth/RegisterRules')
const { validateAll } = use('Validator')
const GraphQLError = use('Adonis/Addons/GraphQLError')
const User = use('App/Models/User')

const registerUser = (_, { input }) => {
  return validateAll({ ...input }, registerRules)
    .then(validation => {
      if (validation.fails()) {
        throw new GraphQLError('Validation Failed', validation.messages())
      }

      const { passwordConfirm, ...userData } = input
      return User.create(userData)
    })
    .then(() => 'User registed successfully.')
}

module.exports = {
  Mutation: {
    registerUser
  }
}
