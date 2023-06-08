import mongoose from 'mongoose'
import {IKey, IKeyModel, KeySchema } from './key.model'

export interface IApiKey extends IKey {}

export interface IApiKeyModel extends IKeyModel {}

const ApiKey = mongoose.model('ApiKey', KeySchema)

export default ApiKey
