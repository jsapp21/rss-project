/* eslint-disable no-debugger */
const mongoService = require('./mongo.service');

const orders = {
  getAllOrders: () => mongoService.db.collection('orders').find().toArray(),
  postOrder: async (req) => {
    const response = await mongoService.db.collection('orders').insertOne(req);
    return mongoService.db.collection('orders').findOne({ _id: response.insertedId });
  },
};

module.exports = orders;
