/* eslint-disable no-debugger */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const users = require('../services/users.service');

router.get('/', async (req, res, next) => {
  try {
    const userId = '6144dfc0a0d2d20e59b0ee03';
    const user = await users.getUser(userId);
    res.send(user);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
