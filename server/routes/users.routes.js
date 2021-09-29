/* eslint-disable no-debugger */
/* eslint-disable no-console */
const express = require('express');
// const setUser = require('../middleware/setUser');

const router = express.Router();
const users = require('../services/users.service');
const orders = require('../services/orders.service');

router.get('/', async (req, res, next) => {
  try {
    const allUsers = await users.getUsers();
    res.send(allUsers);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    debugger;
    const user = await users.getUser(req.params.id);
    // eslint-disable-next-line dot-notation
    const userRole = user[0]['role'];
    req.session.user = { _id: req.params.id, role: userRole };
    // debugger;
    // console.log(user);

    res.send(user);
  } catch (e) {
    next(e);
  }
});

router.get('/:id/orders', async (req, res, next) => {
  try {
    debugger;
    const { id } = req.params;
    const allUserOrders = await orders.getAllOrders(id);
    res.send(allUserOrders);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
