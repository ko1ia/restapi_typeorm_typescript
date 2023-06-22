import 'reflect-metadata'
import { DataSource } from 'typeorm'

const DataBase = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'node_postgres',
  synchronize: true,
  logging: false,
  entities: [`${__dirname}/../models/entity/*.{js,ts}`],
  migrations: [`${__dirname}/../models/migration/*.{js,ts}`],
  subscribers: [],
})

export { DataBase }
