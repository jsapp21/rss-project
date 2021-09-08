/* eslint-disable valid-typeof */
/* eslint-disable no-debugger */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const { ObjectId } = require('mongodb');
const service = require('../services/items.service');
const { NotFound, ServerError } = require('../utils/errors');

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

router.post('/outofstock/', async (req, res, next) => {
  try {
    const validId = ObjectId.isValid(req.body._id);
    if (!validId) {
      throw new NotFound('not found');
    }
    const response = await service.updateOutOfStock(req.body);
    res.send(response.value);
  } catch (err) {
    next(err);
  }
});

router.get('/delete/:id', async (req, res, next) => {
  try {
    const validId = ObjectId.isValid(req.params.id);
    if (!validId) {
      throw new NotFound('not found');
    }
    const response = await service.deleteMenuItem(req.params.id);
    if (!response || response.deletedCount === 0) {
      throw new ServerError('item not found');
    }
    res.send({ status: res.statusCode, message: 'Item has been deleted.' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
