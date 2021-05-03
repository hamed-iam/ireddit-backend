import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import express from 'express';
import { __prod__ } from './constants';
// import { Post } from './entities/Post';
import microConfig from './mikro-orm.config';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './reslovers/hello';
import { PostResolver } from './reslovers/post';

const main = async () => {
  const orm = await MikroORM.init(microConfig); // connect to db
  await orm.getMigrator().up(); //run the migration before anything else

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('listening at http://localhost:4000');
  });
};

main().catch((err) => console.log(err));
