const express = require('express');
const router = express.Router();
const service = require('../services/item.service')

router.post("/", async (req, res) => {
    try {
        const verifyItem = await service.getItemCheck(req.body)
        if (verifyItem) {
            res.send({ error: 'Item already exsits.' })
        } else {
            const newItem = await service.postMenuItem(req.body)
            res.send(newItem)
        }
    } catch (e) {
        console.log(e)
    }
});

router.get([
    "/",
    "/:id" 
], async (req, res) => {
    try {
        const user = { userId: req.params.id }
        
        const userMenuItems = await service.getMenuItems(user)
        res.send(userMenuItems)
    } catch (e){
        console.log(e)
    }
});

module.exports = router
