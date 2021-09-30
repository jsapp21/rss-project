/* eslint-disable no-debugger */
const { ObjectId } = require('bson');
const mongoService = require('./mongo.service');
const { Order } = require('../models/validation.schema');
const { BadRequest, ServerError, NotFound } = require('../utils/errors');

const orders = {
  getAllOrdersByUser: (id) => {
    const request = mongoService.db
      .collection('orders')
      .find({ userId: new ObjectId(id) })
      .toArray();
    if (request.length === 0) {
      throw new NotFound('You do not have any orders yet.');
    } else {
      return request;
    }
    // create an index? so you're not searching through each order
  },
  postOrder: async (req) => {
    await Order.validate(req.body);
    const request = {
      ...req.body,
      menuId: new ObjectId(req.body.menuId),
      userId: new ObjectId(req.body.userId),
      createdOn: new Date(),
    };
    const result = await mongoService.db.collection('orders').insertOne(request);
    if (!result.acknowledged) {
      throw new BadRequest('Your order can not be placed due to an server error.');
    }
    return result;
  },
  cancelOrder: (id) => {
    const request = mongoService.db
      .collection('orders')
      .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { canceled: true } }, { returnDocument: 'after' });
    if (!request) {
      throw new ServerError('Order did not cancel due to a server error.');
    } else {
      return request;
    }
  },
  lookUpOrders: () => {},
};

module.exports = orders;
