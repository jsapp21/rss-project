const express = require('express');
const router = express.Router();
const service = require('../services/users.service')

router.get("/", async (req, res) => {
    try {
        const result = await service.getAllUsers()
        res.send(result)
    } catch (e){
        console.log(e)
    }
});

module.exports = router