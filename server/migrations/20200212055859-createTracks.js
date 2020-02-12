export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tracks', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      deezerData: {
        type: Sequelize.JSON
      },
      deezerId: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('tracks')
  }
}
