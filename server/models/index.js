import Sequelize from 'sequelize'
import config from './../config/sequilize'
import { NODE_ENV } from './../constants'
import fs from 'fs'
import path from 'path'

const basename = path.basename(__filename)

const db = {}
const environmentConfig = config[NODE_ENV]
let sequelize
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL)
} else {
  sequelize = new Sequelize(
    environmentConfig.database,
    environmentConfig.username,
    environmentConfig.password,
    environmentConfig
  )
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    )
  })
  .forEach(file => {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

db.sequelize = sequelize
db.Sequelize = Sequelize

db.Track.belongsToMany(db.PlayList, {
  through: 'playlist_track',
  foreignKey: 'trackId',
  otherKey: 'playListId',
  as: 'playLists'
})

db.PlayList.belongsToMany(db.Track, {
  through: 'playlist_track',
  foreignKey: 'playListId',
  otherKey: 'trackId',
  as: 'tracks'
})

export default db
