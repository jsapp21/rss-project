const mongoService = require('./mongo.service')

const service = {
    getAllUsers: () => mongoService.db.collection('users').find().toArray()
}

module.exports = service;