/* eslint-disable no-debugger */
/* eslint-disable no-console */
const { ObjectId } = require('bson');
const mongoService = require('./mongo.service');

const items = {
  getMenuItems: (menu) => mongoService.db.collection('items').find(menu).toArray(),
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
  lookUpOrders: () =>
    mongoService.db
      .collection('items')
      .aggregate([
        { $lookup: { from: 'orders', localField: '_id', foreignField: 'orderItems.itemId', as: 'item_orders' } },
      ]),
};

module.exports = items;

// works
// db.getCollection('items').aggregate([{ $lookup: { from: "orders", localField: "price", foreignField: "orderItems.price", as: "orders_per_item" }}])

// does not work
// db.getCollection('items').aggregate([{ $lookup: { from: "orders", localField: "_id", foreignField: "orderItems.itemId", as: "orders_per_item" }}])
