export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('playlist_track', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      playListId: {
        type: Sequelize.INTEGER,
        references: { model: 'playlists', key: 'id' }
      },
      trackId: {
        type: Sequelize.INTEGER,
        references: { model: 'tracks', key: 'id' }
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('playlist_track')
  }
}
