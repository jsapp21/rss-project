/* eslint-disable valid-typeof */
/* eslint-disable no-debugger */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const service = require('../services/items.service');
const { NotFound, ServerError } = require('../utils/errors');
const { ObjectId } = require('mongodb');

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

router.get('/outofstock/:id', (req, res, next) => {
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
    const validId = ObjectId.isValid(req.params.id);
    if (!validId) {
      throw new NotFound('bad request');
    }
    const response = await service.deleteMenuItem(req.params.id);
    if (!response || response.deletedCount === 0) {
      throw new ServerError('item not found');
    }
    res.send({ message: 'Item has been deleted.' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
// 1) curl /items/delete/999 where 999 does not exist, should “throw new NotFoundError()”
// where you create a “NotFoundError” class and be caught by the error handler which returns status 404
// 2) curl /items/delete/61323c4e1b58ba67a85a5341 where zzz is not a number, should “throw new Error()”
// and be caught by the error handler which returns status 500
// 3) curl /items/{objected} where object id is a valid id should return status 200 with item json
