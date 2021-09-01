/* eslint-disable no-debugger */
/* eslint-disable no-console */
const { ObjectId } = require('mongodb');
const mongoService = require('./mongo.service');

const service = {
  getMenuItems: (menu) => mongoService.db.collection('items').find(menu).toArray(),
  getItemCheck: (item) => mongoService.db.collection('items').findOne({ name: { $eq: item.name } }),
  postMenuItem: (item) => mongoService.db.collection('items').insertOne(item),
  deleteMenuItem: (item) => mongoService.db.collection('items').deleteOne({ _id: ObjectId(item._id) }),
  updateOutOfStock: (item) => {
    const outOfStockItem = mongoService.db
      .collection('items')
      .updateOne({ _id: ObjectId(item._id) }, { $set: { outOfStock: true } });
    if (outOfStockItem) {
      const response = mongoService.db
        .collection('orders')
        .find({ 'orderItems.itemId': { $eq: item._id } })
        .toArray();
      console.log(response);
    }
  },
};

module.exports = service;
