const express = require('express');
const router = express.Router();
const service = require('../services/menu.service')

router.post("/", (req, res) => {
    console.log(req.body);
//   // if (!db.collection.find({ item: req.body.item })) {
//   // send error item already exists
//   // }
//   // else create

//   const newMenuItem = Menu.create(req.body)
//   // TODO: add express error route
//   .then(item => {
//     if (res.status !== 200){
//       res.send({ error: 'something blew up' })
//     } else {
//       res.send(item)
//     }
//   })
});

router.get("/", (req, res) => {
    console.log(req.body);
});

router.get("/list", async (req, res) => {
    const result = await service.getMenus()
    res.send(result)
});

module.exports = router
