/* eslint-disable no-debugger */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const { ObjectId } = require('bson');
const orders = require('../services/orders.service');
const { NotFound } = require('../utils/errors');

router.post('/', async (req, res, next) => {
  try {
    const newOrder = await orders.postOrder(req);
    res.send({ status: res.statusCode, message: 'Thank you. Your order has been placed.', newOrder });
  } catch (err) {
    next(err);
  }
});

router.get('/user/:id', async (req, res, next) => {
  try {
    debugger;
    const { id } = req.params;
    const allUserOrders = await orders.getAllOrders(id);
    res.send(allUserOrders);
  } catch (err) {
    next(err);
  }
});

router.get('/items/:id', async (req, res, next) => {
  try {
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
