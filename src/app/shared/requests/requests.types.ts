import {Request, Response} from 'express'

export interface IResponse extends Response {}
export interface IRequest extends Request {
  user?: string
}

export interface IListRequest extends IRequest {
  query: {
    page?: number|any
    perPage?: number|any
    sort?: any
    filter?: string
  }
}
