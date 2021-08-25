const mongoService = require('./mongo.service');

const service = {
  getMenuItems: (user) => mongoService.db.collection('items').find(user).toArray(),
  getItemCheck: (req) => mongoService.db.collection('items').findOne(req),
  postMenuItem: (req) => mongoService.db.collection('items').insertOne(req),
};

module.exports = service;
