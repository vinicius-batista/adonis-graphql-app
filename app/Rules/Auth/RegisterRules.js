'use strict'

module.exports = {
  username: 'unique:users,username',
  email: 'email|unique:users,email',
  passwordConfirm: 'same:password'
}
