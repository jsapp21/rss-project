/* eslint-disable no-debugger */
/* eslint-disable no-console */
const express = require('express');
const setUser = require('../middleware/setUser');

const router = express.Router();
const users = require('../services/users.service');

router.get('/:id', setUser, async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await users.getUser(userId);
    res.send(user);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
