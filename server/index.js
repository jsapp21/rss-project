require('dotenv').config()
const express = require('express');
const cors = require('cors')
const app = express(); 
const Menu = require('./models/menu')
const User = require('./models/user')

const { MongoClient } = require('mongodb')
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = process.env.URL
const client = new MongoClient(url)

// Database Name
const dbName = process.env.DB_NAME

async function main() {
  // Use connect method to connect to the server
  await client.connect(`${process.env.URL}/${process.env.DB_NAME}`, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Error: unable to connect to database')
    }
  })
  app.use(cors())
  app.use(express.json())
  app.get('/')
  app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`)); 

//   console.log('Connected successfully to server')
  const db = client.db(dbName)
  const collection = db.collection('menus')

  // the following code examples can be pasted here...


  return 'done.'
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close())



app.get('/users', (req, res) => {
  User.find()
  .then(users => res.send(users))
})

// app.get('/express_backend', (req, res) => {
//   res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); 
// }); 

app.get('/menus', (req, res) => {
  Menu.find()
  .then(items => res.send(items))
})

app.post('/menus', (req, res) => {
  Menu.create(req.body)
  // TODO: add express error route
  .then(item => res.send(item))
});

