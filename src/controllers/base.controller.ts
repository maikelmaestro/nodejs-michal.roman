import express from 'express'

export interface BaseController {
    path: string
    router: express.Router
    initRouter(): void
    // setupCrud(router: express.Router, path: string, crudParams: {find?: any, findOne?: any, createOne?: any, updateOne?: any, deleteOne?: any}): void;
}
