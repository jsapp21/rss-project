const mongoService = require('./mongo.service');

const orders = {
  getAllOrders: () => mongoService.db.collection('orders').find().toArray(),
  postOrder: async (req) => {
    const response = await mongoService.db.collection('orders').insertOne(req);
    return mongoService.db.collection('orders').findOne({ _id: response.insertedId });
  },
  lookUpOrders: () => mongoService.db.collection('orders').find().toArray(),
};

module.exports = orders;
// db.getCollection('orders').find({"orderItems": { "itemId": "61268fed94e188d819d9ec04" }})
