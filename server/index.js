require('dotenv').config()
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors')
const app = express(); 
const router = require('express').Router();
const Menu = require('./models/menu')
const mongoService = require('./services/mongo.service')

app.use(cors())
app.use(express.json())

const url = process.env.URL
const client = new MongoClient(url)
const dbName = process.env.DB_NAME

mongoService.connect(url, dbName)
  .then()
  .catch(console.error)

app.get('/', (req, res) => {
  console.log('this works')
})

router.use(
  '/menus',
  require('./routes/menu.routes'),
);
// base route

app.use(router)

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`)); 