require('dotenv').config()
const express = require('express');
const app = express(); 
const router = require('express').Router();
const mongoService = require('./services/mongo.service')
const cors = require('cors')

mongoService.connect(process.env.URL, process.env.DB_NAME)
  .then()
  .catch(console.error)

app.use(cors())
app.use(express.json())

// base routes
router.use(
  '/menus',
  require('./routes/menu.routes'),
);

app.use(router)

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`)); 