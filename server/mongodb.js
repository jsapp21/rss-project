// const { MongoClient } = require('mongodb')
// // or as an es module:
// // import { MongoClient } from 'mongodb'
// const app = require('./server');

// const url = 'mongodb://127.0.0.1:27017'
// const client = new MongoClient(url)
// const dbName = 'point-of-sale'

// const main = async () => {
//   // Use connect method to connect to the server
//   await client.connect(url, { useNewUrlParser: true }, (err, client) => {
//     if (err) {
//         return console.log('Error: unable to connect to database')
//     }
//   console.log('Connected successfully to server')
//   const db = client.db(dbName)
//   const collection = db.collection('users')

//   // the following code examples can be pasted here...

//     })
//     return 'done'
// }

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close())

