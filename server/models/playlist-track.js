export default (sequelize, DataTypes) => {
  const PlaylistTracks = sequelize.define(
    'PlaylistTracks',
    {
      playListId: DataTypes.INTEGER,
      trackId: DataTypes.INTEGER
    },
    {
      tableName: 'playlist_track'
    }
  )
  return PlaylistTracks
}
