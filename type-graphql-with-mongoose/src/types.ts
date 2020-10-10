// import {Request,Response} from 'express'
import {Document} from 'mongoose'

export type MyContext = {
    req:Express.Request
    res:Express.Response
}

export interface UserInterface extends Document {
    email:string
    username:string
    password:string
    createdAt:string
    updatedAt:string
}