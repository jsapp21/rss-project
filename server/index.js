/* eslint-disable no-debugger */
/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');

const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const mongoService = require('./services/mongo.service');
const handleErrors = require('./middleware/handleErrors');
const { schema } = require('./graphQl/schema');

mongoService.connect(process.env.URL, process.env.DB_NAME).then().catch(console.error);

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: 'my secret', // in production this would be an encripted code
    resave: false, 
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: `${process.env.URL}`,
      dbName: `${process.env.DB_NAME}`,
      touchAfter: 24 * 3600, 
    }),
  }),
);

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);
app.use(handleErrors);

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
