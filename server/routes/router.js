const express = require('express');
const router = express.Router();

router.post("/menu", (req, res) => {
    console.log(req.body);
});