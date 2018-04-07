'use strict'

module.exports = {
  username: 'required|unique:users,username',
  email: 'required|email|unique:users,email',
  password: 'required',
  passwordConfirm: 'required_if:password|same:password'
}
