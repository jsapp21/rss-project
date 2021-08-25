const mongoService = require('./mongo.service');

const service = {
  getAllMenus: () => mongoService.db.collection('menus').find().toArray(),
};

module.exports = service;
