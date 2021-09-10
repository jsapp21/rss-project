/* eslint-disable no-debugger */
/* eslint-disable no-console */
const { ObjectId } = require('bson');
const { MongoClient } = require('mongodb');
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
    const client = new MongoClient(process.env.URL);
    await client.connect();
    const itemsCollection = mongoService.db.collection('items');
    const ordersCollection = mongoService.db.collection('orders');
    const session = client.startSession();
    try {
      const transactionResults = await session.withTransaction(async () => {
        const itemsResults = await itemsCollection.findOneAndUpdate(
          { _id: new ObjectId(item._id) },
          { $set: { outOfStock: item.outOfStock } },
          { returnDocument: 'after' },
          { session },
        );
        console.log(itemsResults, 'itemsResults');
        const ordersResults = await ordersCollection.updateMany(
          { 'orderItems.itemId': ObjectId(item._id) },
          { $set: { 'orderItems.$.outOfStock': true } },
          { fullResponse: true, session },
        );
        console.log(ordersResults, 'orderResults');
      });
      if (transactionResults) {
        console.log('The transaction was successfully created.');
      } else {
        console.log('The transaction was intentionally aborted.');
      }
    } catch (e) {
      console.log(`The transaction was aborted due to an unexpected error: ${e}`);
    } finally {
      await session.endSession();
      // await client.close();
    }
  },
  // updateOutOfStock: (item) => {
  //   const result = mongoService.db
  //     .collection('items')
  //     .findOneAndUpdate(
  //       { _id: new ObjectId(item._id) },
  //       { $set: { outOfStock: item.outOfStock } },
  //       { returnDocument: 'after' },
  //     );
  //   return result;
  // },
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
