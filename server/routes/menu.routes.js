const express = require('express');
const router = express.Router();
const service = require('../services/menu.service')

router.post("/", async (req, res) => {
    const verifyItem = await service.getItemCheck(req.body.item)
    if (verifyItem) {
        res.send({ error: 'Item already exsits.' })
    } else {
        const newItem = await service.postMenuItem(req.body)
        res.send(newItem)
    }
});

router.get("/", async (req, res) => {
    const result = await service.getMenus()
    res.send(result)
});

module.exports = router
