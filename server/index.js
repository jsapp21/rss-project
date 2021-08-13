  
const express = require('express');
const mongoose= require('mongoose');
const cors = require('cors')
const app = express(); 
const port = process.env.PORT || 5000;
const Menu = require('./models/menu')
const User = require('./models/user')

const url = 'mongodb://127.0.0.1:27017'
const dbName = 'point-of-sale'

app.use(cors())
app.use(express.json())

mongoose.connect(`${url}/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get('/')

app.get('/users', (req, res) => {
  User.find()
  .then(users => res.send(users))
})

app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); 
}); 

app.get('/menus', (req, res) => {
  Menu.find()
  .then(items => res.send(items))
})

app.post('/menus', (req, res) => {
  Menu.create(req.body)
  .then(item => res.send(item))
});

app.listen(port, () => console.log(`Listening on port ${port}`)); 