export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('playlists', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      name: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' }
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('playlists')
  }
}
