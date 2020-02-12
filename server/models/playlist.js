export default (sequelize, DataTypes) => {
  const PlayList = sequelize.define(
    'PlayList',
    {
      name: DataTypes.STRING,
      userId: DataTypes.INTEGER
    },
    {
      tableName: 'playlists'
    }
  )

  return PlayList
}
