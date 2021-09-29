/* eslint-disable no-debugger */
const { ObjectId } = require('bson');
const mongoService = require('./mongo.service');
const { Order } = require('../models/validation.schema');
const { BadRequest } = require('../utils/errors');

const orders = {
  getAllOrders: (id) =>
    mongoService.db
      .collection('orders')
      .find({ userId: new ObjectId(id) })
      .toArray(),
  // want to created an index so you're not searching through each order
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
      throw new BadRequest('Your order can not be placed due to an server errror.');
    }
    return result;
  },
  lookUpOrders: () => {},
};

module.exports = orders;
