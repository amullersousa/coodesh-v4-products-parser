import * as fs from 'fs'
import * as path from 'path'
import * as sequelize from 'sequelize'
import credentials from '@/config/database'

export type CredentialsProps = {
  database: string
  username: string
  password: string
  host: string
  port: number
  dialect: any
}

class SequelizeModels {
  private models: any = {}
  private modelsLoaded: boolean = false

  private static instance: SequelizeModels
  private constructor() {}

  public static getInstance(): SequelizeModels {
    if (!SequelizeModels.instance) {
      SequelizeModels.instance = new SequelizeModels()
    }
    return SequelizeModels.instance
  }

  private createConnection(credentials: CredentialsProps): sequelize.Sequelize {
    const { database, username, password, host, port, dialect } = credentials
    const options = {
      host,
      dialect,
      port,
      dialectOptions: {
        multipleStatements: true
      },
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
      logging: false
    }

    const sequelizeConnection = new sequelize.Sequelize(
      database,
      username,
      password,
      options
    )

    return sequelizeConnection
  }

  public createModels() {
    const { database, username, password, host, port, dialect } = credentials

    const connection = this.createConnection({
      database,
      username,
      password,
      host,
      port: parseInt(port),
      dialect
    })

    if (this.modelsLoaded) {
      return this.models
    }

    const files = fs
      .readdirSync(path.resolve(__dirname))
      .filter(
        t =>
          (~t.indexOf('.ts') || ~t.indexOf('.js')) &&
          !~t.indexOf('index') &&
          !~t.indexOf('.map')
      )

    const modelsListPromises = Promise.all(
      files.map(async file => {
        const resolve = await import(path.resolve(__dirname, file))
        return resolve.default(connection, sequelize.DataTypes)
      })
    )

    modelsListPromises.then(modelsList => {
      modelsList.forEach(model => (this.models[model.name] = model))

      Object.keys(this.models).forEach(name => {
        if (this.models[name].associate) {
          this.models[name].associate(this.models)
        }
      })
    })

    this.models['sequelize'] = connection
    this.models['Sequelize'] = sequelize

    this.modelsLoaded = true

    return this.models
  }
}

const sequelizeModels = SequelizeModels.getInstance()
export default sequelizeModels.createModels()
