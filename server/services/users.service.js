/* eslint-disable no-debugger */
const { ObjectId } = require('bson');
const mongoService = require('./mongo.service');

const users = {
  getUser: (userId) => {
    const user = mongoService.db.collection('users').findOne({ _id: new ObjectId(userId) });
    return user;
  },
};

module.exports = users;
