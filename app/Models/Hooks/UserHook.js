'use strict'

const Hash = use('Hash')

const hashPassword = async (userInstance) => {
  if (userInstance.password) {
    userInstance.password = await Hash.make(userInstance.password)
  }
}

module.exports = {
  hashPassword
}
