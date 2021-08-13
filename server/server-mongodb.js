const express = require('express');
const app = express(); 
const port = process.env.PORT || 5000;
const User = require('./models/user')

app.use(express.json());

app.get('/')

app.get('/users', (req, res) => {
  User.find()
  .then(users => res.send(users))
})

app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); 
}); 

app.listen(port, () => console.log(`Listening on port ${port}`)); 







// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectId

// MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
//   if (err) {
//       return console.log('Error: unable to connect to database')
//   }

//   const db = client.db(dbName)

//     db.collection('users').findOne({
//       name: "Hector"
//     }, (error, user) => {
//       if (error) {
//           return console.log("Error: Unable to insert user")
//       }
//       console.log(user)
//   })
// })

