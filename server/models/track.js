export default (sequelize, DataTypes) => {
  const Track = sequelize.define(
    'Track',
    {
      deezerData: DataTypes.JSON,
      deezerId: DataTypes.INTEGER
    },
    {
      tableName: 'tracks'
    }
  )

  return Track
}
