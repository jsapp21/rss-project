/* eslint-disable no-debugger */
/* eslint-disable no-console */
const { ObjectId } = require('bson');
const mongoService = require('./mongo.service');
const { BadRequest } = require('../utils/errors');

const items = {
  getMenuItems: (id) =>
    mongoService.db
      .collection('items')
      .find({ menuId: new ObjectId(id) })
      .toArray(),
  postItem: async (newItem) => {
    const itemExists = await mongoService.db.collection('items').findOne({ name: newItem.name });
    if (itemExists) {
      throw new BadRequest('Item already exsits.');
    } else {
      let item = {
        ...newItem,
        menuId: new ObjectId(newItem.menuId),
      };
      const insertedItem = await mongoService.db.collection('items').insertOne(item);
      item = {
        ...newItem,
        _id: insertedItem.insertedId,
      };
      return item;
    }
  },
  deleteMenuItem: (id) => {
    const result = mongoService.db.collection('items').deleteOne({ _id: new ObjectId(id) });
    return result;
  },
  updateOutOfStock: async (item) => {
    const session = mongoService.client.startSession();
    let itemsResults;
    let ordersResults;

    try {
      const transactionResults = await session.withTransaction(async () => {
        itemsResults = await mongoService.db
          .collection('items')
          .findOneAndUpdate(
            { _id: new ObjectId(item._id) },
            { $set: { outOfStock: item.outOfStock } },
            { returnDocument: 'after' },
            { session },
          );
        if (!itemsResults) {
          throw Error('Transaction rolled back when updating the item.');
        }
        ordersResults = await mongoService.db
          .collection('orders')
          .updateMany(
            { 'orderItems.itemId': ObjectId(item._id) },
            { $set: { 'orderItems.$.outOfStock': true } },
            { upsert: false, session },
          );
        if (!ordersResults || ordersResults.modifiedCount === 0) {
          throw Error('Transaction rolled back when updating orders.');
        }
      });

      if (!transactionResults) {
        console.log('The transaction was intentionally aborted.');
      } else {
        console.log('The transaction was successfully created.');
        return itemsResults;
      }
    } finally {
      await session.endSession();
    }
  },
};

module.exports = items;
