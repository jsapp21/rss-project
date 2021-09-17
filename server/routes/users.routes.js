/* eslint-disable no-debugger */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const users = require('../services/users.service');

router.get('/', async (req, res, next) => {
  try {
    const user = await users.getUser();
    req.app.locals.role = user[0].role;
    debugger;
    res.send(user);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;
