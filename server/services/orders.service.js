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

// works
// db.getCollection('items').aggregate([{ $lookup: { from: "orders", localField: "price", foreignField: "orderItems.price", as: "orders_per_item" }}])

// does not work
// db.getCollection('items').aggregate([{ $lookup: { from: "orders", localField: "_id", foreignField: "orderItems.itemId", as: "orders_per_item" }}])
