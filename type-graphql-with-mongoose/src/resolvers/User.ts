import { getTransformedUser } from '../utils/transformModels';
import { JWT_SECRET } from '../constants';
// import { MyContext } from './../types';
import { User } from '../entities/User';
import { Arg, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import {hash,verify} from 'argon2'
import {sign} from 'jsonwebtoken'
import {UserModel} from '../models/User';




@ObjectType()
class Error{
    @Field(() => String)
    field:string

    @Field(() => String)
    message:string
}

@ObjectType()
class RegisterOrLoginResponse{
    @Field(() => User,{nullable:true})
    user?:User

    @Field(() => String,{nullable:true})
    token?:string

    @Field(() => [Error],{nullable:true})
    errors?:Error[]
}

@InputType()
class LoginInput{
    @Field()
    username:string

    @Field()
    password:string
}

@Resolver()
export class UserResolver{
    @Query(() => String)
    hello(){
        return "Hello World!!"
    }

    @Mutation(() => RegisterOrLoginResponse)
    async register(
        @Arg('email')email:string,@Arg('password')password:string,
        @Arg('username')username:string,
    ):Promise<RegisterOrLoginResponse>{
        // TODO: Do the basic validation for each input

        const hashedPassword = await hash(password)
        const rawUser = await UserModel.create({
            email,password:hashedPassword,username
        }as any)
        // console.log(user.);
        const token = await sign({username,userId:rawUser._id},JWT_SECRET)
        const user = getTransformedUser(rawUser)
        return{
            token,
            user
        }
    }

    @Mutation(() => RegisterOrLoginResponse)
    async login(
        @Arg('options')options:LoginInput
    ){
        const {password,username} = options
        const rawUser = await UserModel.findOne({username})
        if(!rawUser){
            return {
                errors:[
                    {
                        field:'username',
                        message:'user with this username does not exists !'
                    }
                ]
            }
        }

        const isValid = await verify(rawUser.password,password)
        if(!isValid){
            return {
                errors:[
                    {
                        field:'password',
                        message:'Incorrect credentials !'
                    }
                ]
            }
        }
        const token = await sign({username,userId:rawUser._id},JWT_SECRET)
        const user = getTransformedUser(rawUser)
        return {
            user,
            token
        }
    }

}