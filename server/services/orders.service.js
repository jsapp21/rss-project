/* eslint-disable no-console */
/* eslint-disable no-debugger */
const { ObjectId } = require('bson');
const mongoService = require('./mongo.service');
const { Order } = require('../schema/validation.schema');
const { ServerError, NotFound } = require('../utils/errors');

const orders = {
  getAllOrders: () => mongoService.db.collection('orders').find().toArray(),
  getAllOrdersByUser: (userId) => {
    const request = mongoService.db
      .collection('orders')
      .find({ userId: new ObjectId(userId) })
      .toArray();
    if (request.length === 0) {
      throw new NotFound('You do not have any orders yet.');
    } else {
      return request;
    }
  },
  postOrder: async (order) => {
    await Order.validate(order);
    const request = {
      ...order,
      menuId: new ObjectId(order.menuId),
      userId: new ObjectId(order.userId),
      createdOn: new Date(),
    };
    const result = await mongoService.db.collection('orders').insertOne(request);
    if (!result.acknowledged) {
      throw new ServerError('Your order can not be placed due to an server error.');
    }
    const newOrder = {
      ...order,
      _id: result.insertedId,
    };
    return newOrder;
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
  pmixReport: () => {
    const result = mongoService.db
      .collection('orders')
      .aggregate([
        {
          $unwind: {
            path: '$orderItems',
          },
        },
        {
          $lookup: {
            from: 'menus',
            localField: 'menuId',
            foreignField: '_id',
            as: 'menu',
          },
        },
        {
          $unwind: {
            path: '$menu',
          },
        },
        {
          $group: {
            _id: '$orderItems.name',
            menu: {
              $first: '$menu.name',
            },
            avgPrice: {
              $avg: '$orderItems.price',
            },
            itemCount: {
              $sum: '$orderItems.quantity',
            },
          },
        },
      ])
      .toArray();
    if (!result) {
      throw new ServerError('Errro: PMIX report is unavailable.');
    } else {
      return result;
    }
  },
};

module.exports = orders;
