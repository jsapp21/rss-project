const { ObjectId } = require('bson');
const mongoService = require('./mongo.service');

const service = {
  getAllMenus: () => mongoService.db.collection('menus').find().toArray(),
  getMenu: (id) =>
    mongoService.db
      .collection('menus')
      .find({ _id: new ObjectId(id) })
      .toArray(),
};

module.exports = service;
