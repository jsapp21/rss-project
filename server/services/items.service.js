/* eslint-disable no-debugger */
/* eslint-disable no-console */
const { ObjectId } = require('bson');
const mongoService = require('./mongo.service');
const { BadRequest, ServerError } = require('../utils/errors');

const items = {
  getMenuItems: (menuId) =>
    mongoService.db
      .collection('items')
      .find({ menuId: new ObjectId(menuId) })
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
  deleteItemTransaction: async (item) => {
    const session = mongoService.client.startSession();
    let itemsResults;
    let ordersResults;

    try {
      const transactionResults = await session.withTransaction(async () => {
        itemsResults = await mongoService.db
          .collection('items')
          .deleteOne({ _id: new ObjectId(item._id) }, { session });
        if (!itemsResults || itemsResults.deletedCount > 1) {
          throw Error('Transaction rolled back when updating the item.');
        }
        ordersResults = await mongoService.db
          .collection('orders')
          .updateMany(
            { 'orderItems.name': item.name },
            { $set: { 'orderItems.$.outOfStock': true } },
            { upsert: false, session },
          );
        if (!ordersResults) {
          throw Error('Transaction rolled back when updating orders.');
        }
      });

      if (!transactionResults) {
        throw Error('The transaction was intentionally aborted.');
      } else {
        return itemsResults;
      }
    } finally {
      await session.endSession();
    }
  },
  tempOutOfStock: (updateItem) => {
    const request = mongoService.db
      .collection('items')
      .findOneAndUpdate(
        { _id: new ObjectId(updateItem._id) },
        { $set: { tempOutOfStock: updateItem.tempOutOfStock } },
        { returnDocument: 'after' },
      );
    if (!request) {
      throw new ServerError('Order did not cancel due to a server error.');
    } else {
      return request;
    }
  },
};

module.exports = items;
