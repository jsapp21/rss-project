/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const orders = require('../services/orders.service');

router.post('/', async (req, res) => {
  try {
    const newOrder = await orders.postOrder(req.body);
    res.send(newOrder);
  } catch (e) {
    console.log(e);
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
