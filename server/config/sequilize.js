import { NODE_ENV } from '~/server/constants'

export default {
  [NODE_ENV]: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    use_env_variable: process.env.DATABASE_URL
  }
}
