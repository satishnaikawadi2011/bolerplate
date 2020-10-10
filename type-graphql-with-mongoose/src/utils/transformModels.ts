import { Document } from 'mongoose';
// import {UserModel} from '../models/User'
import { User } from './../entities/User';
export const getTransformedUser = (user:any):User => {
    return {
        id:user._id,
        createdAt:user.createdAt,
        updatedAt:user.updatedAt,
        email:user.email,
        username:user.username,
    }
}
