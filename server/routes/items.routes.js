/* eslint-disable valid-typeof */
/* eslint-disable no-debugger */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const items = require('../services/items.service');
const userPermissions = require('../middleware/userPermissions');
const { Item } = require('../models/validation.schema');

router.post('/', userPermissions, async (req, res, next) => {
  try {
    debugger;
    const newItem = req.body;
    await Item.validate(newItem);
    const insertedItem = await items.postItem(newItem);
    res.send(insertedItem);
  } catch (err) {
    next(err);
  }
});

router.get(['/', '/:id'], async (req, res, next) => {
  try {
    const menuItems = await items.getMenuItems(req.params.id);
    res.send(menuItems);
  } catch (err) {
    next(err);
  }
});

router.patch('/tempOut/:id', userPermissions, async (req, res, next) => {
  try {
    const updateItem = {
      _id: req.params.id,
      tempOutOfStock: req.body.tempOutOfStock,
    };
    const response = await items.tempOutOfStock(updateItem);
    res.send(response.value);
  } catch (err) {
    next(err);
  }
});

router.delete('/delete/:id', userPermissions, async (req, res, next) => {
  try {
    const item = req.body;
    await items.deleteItemTransaction(item);
    res.send({ status: res.statusCode, message: 'Item has been deleted and previous orders updated.' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
