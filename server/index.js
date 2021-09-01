/* eslint-disable no-debugger */
/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');

const app = express();
const router = require('express').Router();
const cors = require('cors');
const mongoService = require('./services/mongo.service');

mongoService.connect(process.env.URL, process.env.DB_NAME).then().catch(console.error);

app.use(cors());
app.use(express.json());

// base routes
router.use('/menus', require('./routes/menus.routes'));

router.use('/items', require('./routes/items.routes'));

router.use('/orders', require('./routes/orders.routes'));

app.use(router);

// error handling middleware
app.use((error, req, res) => {
  if (error) {
    res.status(400).send({ error: '400 bad request' });
    res.status(401).send({ error: '401 unauthorized' });
    res.status(402).send({ error: '402 payment required' });
    res.status(403).send({ error: '403 forbidden' });
    res.status(404).send({ error: '404 not found' });
    res.status(405).send({ error: '405 not allowed' });
    res.status(500).send({ error: '500 server error' });
    res.status(501).send({ error: '501 not supported' });
    res.status(503).send({ error: '503 service unavailable' });
    res.status(504).send({ error: '504 timed out' });
    res.status(505).send({ error: '505 not allowed' });
  }
});

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
