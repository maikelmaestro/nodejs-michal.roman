import mongoose from 'mongoose'
import {IKey, IKeyModel, KeySchema } from './key.model'

export interface ILicenseKey extends IKey {}

export interface ILicenseKeyModel extends IKeyModel {}

const LicenseKey = mongoose.model('LicenseKey', KeySchema)

export default LicenseKey
