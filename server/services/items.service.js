const mongoService = require('./mongo.service');

const service = {
  getMenuItems: (menu) => mongoService.db.collection('items').find(menu).toArray(),
  getItemCheck: (item) => mongoService.db.collection('items').findOne({ name: { $eq: item.name } }),
  postMenuItem: (item) => mongoService.db.collection('items').insertOne(item),
};

module.exports = service;
