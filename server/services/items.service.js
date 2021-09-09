/* eslint-disable no-debugger */
/* eslint-disable no-console */
const { ObjectId } = require('bson');
const mongoService = require('./mongo.service');

const items = {
  getMenuItems: (id) =>
    mongoService.db
      .collection('items')
      .find({ menuId: new ObjectId(id) })
      .toArray(),
  getItemCheck: (item) => mongoService.db.collection('items').findOne({ name: { $eq: item.name } }),
  postMenuItem: (item) => mongoService.db.collection('items').insertOne(item),
  deleteMenuItem: (id) => {
    const result = mongoService.db.collection('items').deleteOne({ _id: new ObjectId(id) });
    return result;
  },
  updateOutOfStock: (item) => {
    const result = mongoService.db
      .collection('items')
      .findOneAndUpdate(
        { _id: new ObjectId(item._id) },
        { $set: { outOfStock: item.outOfStock } },
        { returnDocument: 'after' },
      );
    return result;
  },
  lookUpOrders: (id) =>
    mongoService.db
      .collection('items')
      .aggregate([
        { $match: { _id: new ObjectId(id) } },
        { $lookup: { from: 'orders', localField: '_id', foreignField: 'orderItems.itemId', as: 'orders_per_item' } },
        { $addFields: { orderCount: { $size: '$orders_per_item' } } },
      ])
      .toArray(),
};

module.exports = items;
