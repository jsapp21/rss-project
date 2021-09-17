/* eslint-disable no-debugger */
/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');

const app = express();
const router = require('express').Router();
const cors = require('cors');
const mongoService = require('./services/mongo.service');
const handleErrors = require('./middleware/handleErrors');

mongoService.connect(process.env.URL, process.env.DB_NAME).then().catch(console.error);

app.use(cors());
app.use(express.json());

// base routes
router.use('/users', require('./routes/users.routes'));

router.use('/menus', require('./routes/menus.routes'));

router.use('/items', require('./routes/items.routes'));

router.use('/orders', require('./routes/orders.routes'));

app.use(router);
app.use(handleErrors);

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
