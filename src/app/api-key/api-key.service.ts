import {ObjectId} from 'mongodb'

import {IApiKey} from './api-key.model'
import {ApiKeyDa} from './api-key.da'
import {CreateApiKeyDto} from './dto/create-api-key.dto'
import {UpdateApiKeyDto} from './dto/update-api-key.dto'

export class ApiKeyService {
  private dataAccess: ApiKeyDa = new ApiKeyDa()

  constructor() {
  }

  async createOne(payload: CreateApiKeyDto): Promise<IApiKey> {
    const {id} = await this.dataAccess.createOne(payload)
    const created = await this.dataAccess.findOne(id)
    console.log(created, 'created item')
    return created
  }

  async find(options: any): Promise<IApiKey> {
    return await this.dataAccess.find(options)
  }

  async findOne(id: string): Promise<IApiKey> {
    const _id: ObjectId = new ObjectId(id)

    if (!_id) {
      throw new Error(`Invalid id ${_id}`)
    }

    return await this.dataAccess.findOne(_id)
  }

  async updateOne(id: string, payload: UpdateApiKeyDto): Promise<IApiKey> {
    const _id = new ObjectId(id)

    if (!_id) {
      throw new Error(`Invalid id ${_id}`)
    }

    return await this.dataAccess.updateOne(_id, payload)
  }

  async deleteOne(id: string): Promise<{deleted: boolean}> {
    const _id = new ObjectId(id)

    if (!_id) {
      throw new Error(`Invalid id ${_id}`)
    }

    const {deleted} =  await this.dataAccess.deleteOne(_id)

    if (!deleted) {
      throw new Error(`Unable to delete item with id ${_id}`)
    }
    return {deleted}
  }
}
