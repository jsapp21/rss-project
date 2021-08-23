const mongoService = require('./mongo.service')

const checkouts = {
    getAllCheckouts: () => mongoService.db.collection('checkouts').find().toArray(),
    postCheckout: (req) => mongoService.db.collection('checkouts').insertOne(req)
}

module.exports = checkouts;