import {Request, Response} from 'express'

export interface IResponse extends Response {}
export interface IRequest extends Request {
  user?: string
}

export interface IListRequest extends IRequest {
  query: {
    filter?: string
    sort?: any
  }
}
