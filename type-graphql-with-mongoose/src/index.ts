import "reflect-metadata";
// /Users/satish/mongodb/bin/mongod.exe  --dbpath=/users/satish/mongodb-data
import { UserResolver } from './resolvers/User';
import { DATABASE_URI } from './constants';
import  express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
// import { UserResolver } from "./UserResolver";
import mongoose from 'mongoose'
// const mongoose = require('mongoose')
// import cors from "cors";
// import { User } from "./entity/User";
(async () => {
  try {
    // await createConnection();
    await mongoose.connect(DATABASE_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    console.log("Connected to database!!!!");
  } catch (error) {
    console.log(error);
  }
  const app = express();
//   app.use(
//     cors({
//       origin: "http://localhost:3000",
//       credentials: true
//     })
//   );
  app.get("/", (_req, res) => res.send("hello"));
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate:false
    }),
    context: ({ req, res }) => ({ req, res })
  });

  apolloServer.applyMiddleware({ app, cors: false });
  app.listen(5001, () => {
    console.log("express server started");
  });
})();