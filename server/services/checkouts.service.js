const mongoService = require('./mongo.service')

const checkouts = {
    getAllCheckouts: () => mongoService.db.collection('checkouts').find().toArray(),
    postCheckout: async (req) => {
        const response = await mongoService.db.collection('checkouts').insertOne(req)
        return mongoService.db.collection('checkouts').findOne({_id: response.insertedId })
    }
}

module.exports = checkouts;