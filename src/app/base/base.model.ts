import {Document, ModifyResult, WithId} from 'mongodb'

export interface IBaseItem extends WithId<Document>, ModifyResult<Document> {
    createdAt: Date
    updatedAt?: Date
}

export interface BaseDto {
    createdAt?: Date
    updatedAt?: Date
}
