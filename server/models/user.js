import bcrypt from 'bcrypt'

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: DataTypes.STRING(10),
      password_hash: DataTypes.STRING
    },
    {
      tableName: 'users'
    }
  )

  User.prototype.setPassword = async function (password) {
    this.password_hash = await bcrypt.hash(password, 10)
  }

  User.prototype.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password_hash)
  }

  return User
}
