import { Field, ObjectType } from "type-graphql";


@ObjectType()
export class User{
    @Field(() => String)
    id:string

    @Field(() => String)
    username:string

    @Field(() => String)
    email:string

    @Field(() => String)
    updatedAt:string

    @Field(() => String)
    createdAt:string
}