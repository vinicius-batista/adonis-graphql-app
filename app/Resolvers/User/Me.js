'use strict'

const me = (_, __, { auth }) => auth.getUser()

module.exports = {
  Query: {
    me
  }
}
