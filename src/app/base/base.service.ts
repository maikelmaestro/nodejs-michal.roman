import {ObjectId} from 'mongodb'
import {BaseDa} from './base.da'
import {IBaseItem, BaseDto} from './base.model'
import {HttpException} from '../../exceptions/HttpException'

export class BaseService<T extends IBaseItem, DTO extends BaseDto> {

  constructor(protected dataAccess: BaseDa<T, DTO>) {}

  async createOne(payload: DTO): Promise<T> {
    const body = {...payload}
    body.createdAt = new Date()

    const {id} = await this.dataAccess.createOne(body)
    return await this.dataAccess.findOne(id)
  }

  async find(query: {filter: any, sort: any}): Promise<T[]> {
    return await this.dataAccess.find(query)
  }

  async findOne(id: string): Promise<T> {
    const _id: ObjectId = new ObjectId(id)

    if (!_id) {
      throw new HttpException(404,`Invalid id ${_id}`)
    }

    return await this.dataAccess.findOne(_id)
  }

  async updateOne(id: string, payload: DTO): Promise<T> {
    const _id = new ObjectId(id)
    let foundItem: T

    if (!_id) {
      throw new HttpException(404, `Invalid id ${_id}`)
    }

    try {
      foundItem = await this.dataAccess.findOne(_id)
    } catch (error) {
      throw new HttpException(404,`Unable to find item with id ${_id}`)
    }

    const body = {...payload}
    body.updatedAt = new Date()
    body.createdAt = foundItem.createdAt

    const {updated} = await this.dataAccess.updateOne(_id, body)
    if (!updated) {
      throw new HttpException(400, `Unable to update item with id ${_id}`)
    }

    return await this.dataAccess.findOne(_id)
  }

  async deleteOne(id: string): Promise<{deleted: boolean}> {
    const _id = new ObjectId(id)

    if (!_id) {
      throw new HttpException(404,`Invalid id ${_id}`)
    }

    const {deleted} = await this.dataAccess.deleteOne(_id)

    if (!deleted) {
      throw new HttpException(400, `Unable to delete item with id ${_id}`)
    }
    return {deleted}
  }
}
