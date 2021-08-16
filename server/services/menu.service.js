const mongoService = require('./mongo.service')

const service = {
    getMenus: () => {
        return mongoService.db.collection('menus').find().toArray()
    }
}

module.exports = service;
