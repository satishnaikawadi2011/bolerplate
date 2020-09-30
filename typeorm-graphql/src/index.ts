import { User } from './entity/User';
import { ResolverMap } from './types/ResolverType';
import 'reflect-metadata';
import { GraphQLServer } from 'graphql-yoga';
import { createConnection, getConnection, getManager, getRepository } from 'typeorm';

const typeDefs = `
	type User{
		id:Int!
		email:String!
		username:String!
	}

  type Query {
	hello(name: String): String!
	user(id:Int!):User!
	users:[User!]!
  }
  type Mutation{
	  createUser(username:String!,email:String!):User!
	  updateUser(username:String,id:Int!,email:String):Boolean
	  deleteUser(id:Int!):Boolean
  }
`;

const resolvers: ResolverMap = {
	Query:
		{
			hello: (_: any, { name }: any) => `hhello ${name || 'World'}`,
			user: (parent, { id }) => User.findOne(id),
			users: (_, { id }) => User.find()
		},
	Mutation:
		{
			// createUser: (_, args) => User.create(args)
			createUser:
				async (_, args) => {
					const user = await getConnection()
						.createQueryBuilder()
						.insert()
						.into(User)
						.values({
							...args
						})
						.execute();
					// console.log(user.identifiers[0].id);

					return {
						...args,
						id: user.identifiers[0].id
					};
				},
			updateUser:
				async (_, { id, ...args }) => {
					try {
						await getConnection()
							.createQueryBuilder()
							.update(User)
							.set({ ...args })
							.where('id = :id', { id })
							.execute();
						return true;
					} catch (error) {
						console.log(error);
						return false;
					}
				},
			deleteUser:
				async (_, { id }) => {
					try {
						const userRepository = getManager().getRepository(User);
						// await getConnection()
						// 	.createQueryBuilder()
						// 	.delete()
						// 	.from(User)
						// 	.where('id = :id', { id })
						// 	.execute();
						// await User.remove();
						const user = await userRepository.findOne(id);
						if (!user) {
							return false;
						}
						await userRepository.delete(id);
						return true;
					} catch (error) {
						console.log(error);
						return false;
					}
				}
		}
};
const server = new GraphQLServer({ typeDefs, resolvers });

const main = async () => {
	try {
		await createConnection();
		await server.start(() => console.log('Server is running on localhost:4000'));
	} catch (error) {
		console.log(error);
	}
};

main();
// psql -h localhost -p 5436 -d test -U postgres
// console.log('====================================');
// console.log('It works');
// console.log('====================================');
