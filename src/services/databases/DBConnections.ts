import {Db, MongoClient} from 'mongodb'

const cluster = require('cluster')
import {ConfigFactory} from '../../factories/configFactory'
import {logger} from '../../logger/tslogger'
import colors from 'colors'
import {DATABASE_NAME} from '../../app/shared/database.consts'


export class DBConnections {
  private static instance: DBConnections
  private readonly mongoClient: Promise<MongoClient>
  private readonly config = ConfigFactory.getConfig()
  public static isConnected: boolean = false

  /***
   *
   * @param isMaster true if current thread is master from cluster
   */
  constructor(isMaster?: boolean) {
    logger.info(colors.yellow('Creating Mongo client ' + this.config.mongoDbUri))
    this.mongoClient = MongoClient.connect(encodeURI(this.config.mongoDbUri)).then(async (res: MongoClient): Promise<MongoClient> => {
        logger.info(colors.cyan('Mongo client connected!'))
        DBConnections.isConnected = true
        return res
      }
    )
  }

  public static getInstance(): DBConnections {
    if (!DBConnections.instance) {
      DBConnections.instance = new DBConnections(cluster.isMaster)
    }
    return DBConnections.instance
  }

  public getMongoClient(): Promise<MongoClient> {
    return this.mongoClient
  }

  public static async getDatabase(): Promise<Db> {
    const client = await DBConnections.getInstance().getMongoClient()
    return client.db(DATABASE_NAME)
  }
}



