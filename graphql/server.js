import express from 'express';
import { graphqlExpress, graphiqlExpress, } from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import schema from './data/schema';
import mongoose from 'mongoose';
import { GRAPHQL_PORT, CLIENT_ORIGIN, } from'./config';
import { dbConnect, } from './db/db-mongoose';

mongoose.Promise = global.Promise;
export const app = express();

app.use(
  morgan(
    process.env.NODE_ENV === 'production' ? 'common' : 'dev',
    {
      skip: (req, res) =>
        process.env.NODE_ENV === 'test',
    }
  )
);

app.use(
  cors({ origin: CLIENT_ORIGIN, })
);

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress((req) => {
    return {
      schema,
      context: {value: req.body,},
    };
  })
);

app.use(
  '/graphiql',
  graphiqlExpress(
    { endpointURL: '/graphql', }
  )
);

dbConnect()
  .then(() => {
    app.listen(GRAPHQL_PORT, () =>
      console.log(
        `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
      )
    );
  });


