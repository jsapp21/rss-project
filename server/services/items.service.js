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
  updateOutOfStock: async (item) => {
    const itemsCollection = mongoService.db.collection('items');
    const ordersCollection = mongoService.db.collection('orders');
    const session = mongoService.client.startSession();
    let itemsResults;
    let ordersResults;

    try {
      const transactionResults = await session.withTransaction(async () => {
        itemsResults = await itemsCollection.findOneAndUpdate(
          { _id: new ObjectId(item._id) },
          { $set: { outOfStock: item.outOfStock } },
          { returnDocument: 'after' },
          { session },
        );
        if (!itemsResults) {
          throw Error('Transaction rolled back when updating the item.');
        }
        ordersResults = await ordersCollection.updateMany(
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
  lookUpOrders: (id) =>
    mongoService.db
      .collection('items')
      .aggregate([
        {
          $match: {
            'orderItems.itemId': new ObjectId(id),
          },
        },
        {
          $unwind: {
            path: '$orderItems',
          },
        },
        {
          $lookup: {
            from: 'items',
            localField: 'orderItems.itemId',
            foreignField: '_id',
            as: 'items_per_order',
          },
        },
        {
          $unwind: {
            path: '$items_per_order',
          },
        },
        {
          $group: {
            _id: '$_id',
            menuId: {
              $first: '$menuId',
            },
            items: {
              $push: {
                _id: '$orderItems.itemId',
                name: '$items_per_order.name',
                price: '$orderItems.price',
                quantity: '$orderItems.quanity',
                outOfStock: '$items_per_order.outOfStock',
              },
            },
            createdOn: {
              $first: '$createdOn',
            },
          },
        },
      ])
      .toArray(),
};

module.exports = items;
