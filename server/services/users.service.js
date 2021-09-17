const mongoService = require('./mongo.service');

const users = {
  getUser: () => mongoService.db.collection('users').find().toArray(),
};

module.exports = users;
