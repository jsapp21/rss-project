const mongoService = require('./mongo.service')

const service = {
    getMenus: () => mongoService.db.collection('items').find().toArray(),
    getItemCheck: (req) => mongoService.db.collection('items').findOne(req),
    postMenuItem: (req) => mongoService.db.collection('items').insertOne(req)
}

module.exports = service;
