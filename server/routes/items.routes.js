/* eslint-disable no-debugger */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const service = require('../services/items.service');
const orders = require('../services/orders.service');

router.post('/', async (req, res, next) => {
  try {
    const verifyItem = await service.getItemCheck(req.body);
    if (verifyItem) {
      res.send({ error: 'Item already exsits.' });
    } else {
      const newItem = await service.postMenuItem(req.body);
      res.send(newItem);
    }
  } catch (err) {
    next(err);
  }
});

router.get(['/', '/:id'], async (req, res, next) => {
  try {
    const menu = { menuId: req.params.id };
    const menuItems = await service.getMenuItems(menu);
    res.send(menuItems);
  } catch (err) {
    next(err);
  }
});

router.get('/outofstock/:id', async (req, res, next) => {
  try {
    const item = { _id: req.params.id };
    service.updateOutOfStock(item);
    res.send({ message: 'Item is out of stock.' });
    // update the item to out of stock: true
    // Orders that belongs to the item, update { $set out of stock: true }
  } catch (err) {
    next(err);
  }
});

router.get('/delete/:id', async (req, res, next) => {
  try {
    const item = { _id: req.params.id };
    const data = await service.deleteMenuItem(item);
    res.send({ message: 'Item has been deleted.' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
