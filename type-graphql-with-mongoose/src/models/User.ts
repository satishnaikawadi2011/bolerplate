import { UserInterface } from './../types';
import { User } from './../entities/User';
import {Schema,model} from 'mongoose'

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
},{
    timestamps:true
})

export const UserModel = model<UserInterface>('user',userSchema)
// export default UserModel; 
// module.exports = UserModel;