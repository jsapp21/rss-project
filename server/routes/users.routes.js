/* eslint-disable no-debugger */
/* eslint-disable no-console */
const express = require('express');
const setUser = require('../middleware/setUser');

const router = express.Router();
const users = require('../services/users.service');

router.get('/', async (req, res, next) => {
  try {
    const allUsers = await users.getUsers();
    res.send(allUsers);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
