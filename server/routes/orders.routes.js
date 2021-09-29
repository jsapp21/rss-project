/* eslint-disable no-debugger */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const { ObjectId } = require('bson');
const orders = require('../services/orders.service');
const { NotFound } = require('../utils/errors');
const userPermissions = require('../middleware/userPermissions');

router.post('/', async (req, res, next) => {
  try {
    const newOrder = await orders.postOrder(req);
    res.send({ status: res.statusCode, message: 'Thank you. Your order has been placed.', newOrder });
  } catch (err) {
    next(err);
  }
});

// get all users orders
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const allUserOrders = await orders.getAllOrdersByUser(id);
    res.send(allUserOrders);
  } catch (err) {
    next(err);
  }
});

// cancel order
router.patch('/:id', userPermissions, async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedOrder = await orders.cancelOrder(id);
    res.send(updatedOrder.value);
  } catch (err) {
    next(err);
  }
});

// router.get('/items/:id', async (req, res, next) => {
//   try {
//     const validId = ObjectId.isValid(req.params.id);
//     if (!validId) {
//       throw new NotFound('Item not found.');
//     }
//     const lookUpOrders = await orders.lookUpOrders(req.params.id);
//     res.send(lookUpOrders);
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
