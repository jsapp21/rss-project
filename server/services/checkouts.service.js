const mongoService = require('./mongo.service')

const service = {
    getAllCheckouts: () => mongoService.db.collection('checkouts').find().toArray()
}

module.exports = service;