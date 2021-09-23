/* eslint-disable no-debugger */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const { ObjectId } = require('mongodb');
const orders = require('../services/orders.service');
const { NotFound } = require('../utils/errors');

router.post('/', async (req, res, next) => {
  try {
    const updatedOrderItems = req.body.orderItems.map((order) => ({
      ...order,
      itemId: new ObjectId(order.itemId),
    }));
    const request = {
      menuId: new ObjectId(req.body.menuId),
      orderItems: updatedOrderItems,
      createdOn: new Date(),
    };
    const newOrder = await orders.postOrder(request);
    res.send(newOrder);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const allOrders = await orders.getAllOrders();
    res.send(allOrders);
  } catch (err) {
    next(err);
  }
});

router.get('/items/:id', async (req, res, next) => {
  try {
    debugger;
    const validId = ObjectId.isValid(req.params.id);
    if (!validId) {
      throw new NotFound('Item not found.');
    }
    const lookUpOrders = await orders.lookUpOrders(req.params.id);
    res.send(lookUpOrders);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
