import express from 'express';
import jwt from 'express-jwt';
import { ApolloServer } from 'apollo-server-express';
import { createContext, EXPECTED_OPTIONS_KEY } from 'dataloader-sequelize';
import to from 'await-to-js';
import { sequelize } from './models';
import { ENV } from './config';
import { resolver as resolvers, schema, schemaDirectives } from './graphql';

const app = express();

const authMiddleware = jwt({
  secret: ENV.JWT_ENCRYPTION,
  credentialsRequired: false,
});
app.use(authMiddleware);

app.use(function(err: any, _req: any, res: any, _next: any) {
  const errorObject = { error: true, message: `${err.name}: ${err.message}` };
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json(errorObject);
  } else {
    return res.status(400).json(errorObject);
  }
});

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  schemaDirectives,
  playground: true,
  context: ({ req }: { req: any }) => {
    return {
      [EXPECTED_OPTIONS_KEY]: createContext(sequelize),
      user: req.user,
    };
  },
});
server.applyMiddleware({
  app,
  cors: {
    origin: '*',
    credentials: true,
  },
});

app.listen({ port: ENV.PORT }, async () => {
  console.log(`🚀 Server ready at http://localhost:${ENV.PORT}${server.graphqlPath}`);
  let err: any;
  [err] = await to(Promise.resolve(sequelize.sync()));

  if (err) {
    console.error('Error: Cannot connect to database');
    console.error(err);
  } else {
    console.log('Connected to database');
  }
});
