/* eslint-disable no-debugger */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const service = require('../services/items.service');

router.post('/', async (req, res) => {
  const verifyItem = await service.getItemCheck(req.body);
  if (verifyItem) {
    res.send({ error: 'Item already exsits.' });
  } else {
    const newItem = await service.postMenuItem(req.body);
    res.send(newItem);
  }
});

router.get(['/', '/:id'], async (req, res) => {
  const menu = { menuId: req.params.id };

  const menuItems = await service.getMenuItems(menu);
  res.send(menuItems);
});

// router.get('/outofstock/:id', async (req, res) => {
//   const menu = { menuId: req.params.id };

//   const menuItems = await service.getMenuItems(menu);
//   res.send(menuItems);
// });

router.get('/delete/:id', (req, res, next) => {
  // error handlding needs to be done on client side this way
  // const item = { _id: req.params.id };
  // service
  //   .deleteMenuItem(item)
  //   .then((response) => res.send(response))
  //   .catch(next);
  const item = { _id: req.params.id };
  service
    .deleteMenuItem(item)
    .then((response) => {
      if (response.deletedCount === 1) {
        res.status(200).send({ message: 'Your item was deleted.' });
      } else {
        const error = { error: 'Error: Unable to delete item' };
        res.status(400).send(error);
        res.status(500).send(error);
      }
    })
    .catch(next);
});

module.exports = router;
