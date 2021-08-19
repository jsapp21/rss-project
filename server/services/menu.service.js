const mongoService = require('./mongo.service')

const service = {
    getMenus: () => mongoService.db.collection('menus').find().toArray(),
    getItemCheck: (req) => mongoService.db.collection('menus').findOne(req),
    postMenuItem: (req) => mongoService.db.collection('menus').insertOne(req)
}

module.exports = service;
