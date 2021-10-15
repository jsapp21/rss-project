/* eslint-disable no-debugger */
/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');

const app = express();
const router = require('express').Router();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const mongoService = require('./services/mongo.service');
const handleErrors = require('./middleware/handleErrors');
const { schema } = require('./schema/schema');
const { Item } = require('./schema/Item');

mongoService.connect(process.env.URL, process.env.DB_NAME).then().catch(console.error);

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: 'my secret', // in production this would be an encripted code
    resave: false, // do not save session if unmodified
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: `${process.env.URL}`,
      dbName: `${process.env.DB_NAME}`,
      touchAfter: 24 * 3600, // time period in seconds
    }),
  }),
);

const root = {
  getItem: ({ menuId, name, price, outOfStock, tempOutOfStock }) =>
    new Item(menuId, name, price, outOfStock, tempOutOfStock),
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  }),
);

// base routes
router.use('/users', require('./routes/users.routes'));

router.use('/menus', require('./routes/menus.routes'));

router.use('/items', require('./routes/items.routes'));

router.use('/orders', require('./routes/orders.routes'));

app.use(router);
app.use(handleErrors);

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
