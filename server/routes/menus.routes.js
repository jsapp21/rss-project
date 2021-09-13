/* eslint-disable no-debugger */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const service = require('../services/menus.service');
const { Menu } = require('../models/validation.schema');

router.get('/', async (req, res) => {
  try {
    const result = await service.getAllMenus();
    const validationCheck = await Menu.validate(result);
    res.send(validationCheck);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
