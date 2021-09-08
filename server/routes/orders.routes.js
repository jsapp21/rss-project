/* eslint-disable no-debugger */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const { ObjectId } = require('mongodb');
const orders = require('../services/orders.service');

router.post('/', async (req, res) => {
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
  } catch (e) {
    res.send({ error: `You're order still needs to be checked out.` });
  }
});

router.get('/', async (req, res) => {
  try {
    const allOrders = await orders.getAllOrders();
    res.send(allOrders);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
