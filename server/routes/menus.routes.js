/* eslint-disable no-debugger */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const service = require('../services/menus.service');

router.get('/', async (req, res) => {
  try {
    const result = await service.getAllMenus();
    res.send(result);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
