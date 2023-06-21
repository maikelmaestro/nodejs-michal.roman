import {IListRequest, IRequest, IResponse} from '../shared/requests/requests.types'
import {Response} from 'express'
import {DEFAULT_SORT} from '../shared/api.consts'
import {IUser} from '../user/user.model'
import {BaseService} from './base.service'
import {BaseDto, IBaseItem} from './base.model'

export class CrudController<T> {
  constructor(protected service: BaseService<IBaseItem, BaseDto>) {}

  async createOneWithoutUserFilter(req: IRequest, res: IResponse): Promise<Response<IUser>> {
    try {
      const created: IBaseItem = await this.service.createOne(req.body)
      return res.json(created)
    } catch (error) {
      return res.status(error.status).json({message: error.message})
    }
  }

  async createOne(req: IRequest, res: IResponse): Promise<Response<T>> {
    const body = {...req.body}
    body.user = req.user as string || undefined

    try {
      const created: IBaseItem = await this.service.createOne(body)
      return res.json(created)
    } catch (error) {
      return res.status(error.status).json({message: error.message})
    }
  }

  async find(req: IListRequest, res: IResponse): Promise<Response<T[]>> {
    let filter: any

    if (req.query.filter?.length) {
      filter = JSON.parse(decodeURIComponent(req.query.filter))
    }

    const sort = req.query.sort?.length ? JSON.parse(decodeURIComponent(req.query.sort)) : DEFAULT_SORT

    if (req.user) {
      filter = {...filter, user: req.user}
    }

    try {
      const items = await this.service.find({filter, sort})
      return res.json(items)
    } catch (error) {
      return res.status(error.status || 400).json({message: error.message})
    }
  }

  async findWithoutUserFilter(req: IListRequest, res: IResponse): Promise<Response<T[]>> {
    let filter: any

    if (req.query.filter?.length) {
      filter = JSON.parse(decodeURIComponent(req.query.filter))
    }

    const sort = req.query.sort?.length ? JSON.parse(decodeURIComponent(req.query.sort)) : DEFAULT_SORT

    try {
      const items: IBaseItem[] = await this.service.find({filter, sort})
      return res.json(items)
    } catch (error) {
      return res.status(error.status || 400).json({message: error.message})
    }
  }

  async findOne(req: IRequest, res: IResponse): Promise<Response<T>> {
    try {
      const item: IBaseItem = await this.service.findOne(req.params._id)
      return res.json(item)
    } catch (error) {
      return res.status(error.status || 400).json({message: error.message})
    }
  }

  async updateOne(req: IRequest, res: IResponse): Promise<Response<T>> {
    try {
      const item: IBaseItem = await this.service.updateOne(req.params._id, req.body)
      return res.json(item)
    } catch (error) {
      return res.status(error.status || 400).json({message: error.message})
    }
  }

  async deleteOne(req: IRequest, res: IResponse): Promise<Response> {
    try {
      const deleted: {deleted: boolean} = await this.service.deleteOne(req.params._id)
      return res.json(deleted)
    } catch (error) {
      return res.status(error.status || 400).json({message: error.message})
    }
  }
}
