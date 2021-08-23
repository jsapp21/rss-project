const express = require('express');
const router = express.Router();
const checkouts = require('../services/checkouts.service')

router.post("/", async (req, res) => {
    try {
        const newCheckout = await checkouts.postCheckout(req.body)
        res.send(newCheckout)
    } catch (e) {
        console.log(e)
        res.send({ error: `You're order still needs to be checked out.` })
    }
});

router.get("/", async (req, res) => {
    try {
        const result = await checkouts.getAllCheckouts()
        res.send(result)
    } catch (e){
        console.log(e)
    }
});

module.exports = router
