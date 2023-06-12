import {IApiKey} from './api-key.model'
import {ApiKeyDa} from './api-key.da'
import {ApiKeyDto} from './dto/api-key.dto'
import {BaseService} from '../base/base.service'

export class ApiKeyService extends BaseService<IApiKey, ApiKeyDto>{
  constructor() {
    super(new ApiKeyDa())
  }
}
// export class ApiKeyService {
//   private dataAccess: ApiKeyDa = new ApiKeyDa()
//
//   constructor() {}
//
//   async createOne(payload: ApiKeyDto): Promise<IApiKey> {
//     const {id} = await this.dataAccess.createOne(payload)
//     return await this.dataAccess.findOne(id)
//   }
//
//   async find(options: any): Promise<IApiKey[]> {
//     return await this.dataAccess.find(options)
//   }
//
//   async findOne(id: string): Promise<IApiKey> {
//     const _id: ObjectId = new ObjectId(id)
//
//     if (!_id) {
//       throw new Error(`Invalid id ${_id}`)
//     }
//
//     return await this.dataAccess.findOne(_id)
//   }
//
//   async updateOne(id: string, payload: ApiKeyDto): Promise<IApiKey> {
//     const _id = new ObjectId(id)
//
//     if (!_id) {
//       throw new Error(`Invalid id ${_id}`)
//     }
//
//     const {updated} = await this.dataAccess.updateOne(_id, payload)
//     if (!updated) {
//       throw new Error(`Unable to update item with id ${_id}`)
//     }
//
//     return await this.dataAccess.findOne(_id)
//   }
//
//   async deleteOne(id: string): Promise<{deleted: boolean}> {
//     const _id = new ObjectId(id)
//
//     if (!_id) {
//       throw new Error(`Invalid id ${_id}`)
//     }
//
//     const {deleted} =  await this.dataAccess.deleteOne(_id)
//
//     if (!deleted) {
//       throw new Error(`Unable to delete item with id ${_id}`)
//     }
//     return {deleted}
//   }
// }
