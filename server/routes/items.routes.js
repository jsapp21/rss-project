/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const service = require('../services/items.service');

router.post('/', async (req, res) => {
  try {
    const verifyItem = await service.getItemCheck(req.body);
    if (verifyItem) {
      res.send({ error: 'Item already exsits.' });
    } else {
      const newItem = await service.postMenuItem(req.body);
      res.send(newItem);
    }
  } catch (e) {
    console.log(e);
  }
});

router.get(['/', '/:id'], async (req, res) => {
  try {
    const menu = { menuId: req.params.id };

    const menuItems = await service.getMenuItems(menu);
    res.send(menuItems);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
