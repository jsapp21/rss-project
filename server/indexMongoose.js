require('dotenv').config()
const express = require('express');
const mongoose= require('mongoose');
const cors = require('cors')
const app = express(); 
const Menu = require('./models/menu')
const User = require('./models/user')

app.use(cors())
app.use(express.json())

mongoose.connect(`${process.env.URL}/${process.env.DB_NAME}`, {
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
  // TODO: add express error route
  .then(item => res.send(item))
});

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`)); 