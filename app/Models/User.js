'use strict'

const Model = use('Model')

class User extends Model {
  static boot () {
    super.boot()
    this.addHook('beforeCreate', 'User.hashPassword')
  }

  tokens () {
    return this.hasMany('App/Models/Token', 'id', 'userId')
  }
}

module.exports = User
