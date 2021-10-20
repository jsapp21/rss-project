/* eslint-disable no-debugger */
// const { ObjectId } = require('bson');
const { ObjectId } = require('bson');
const mongoService = require('./mongo.service');

const users = {
  getUsers: () => mongoService.db.collection('users').find().toArray(),
  getUser: (id) =>
    mongoService.db
      .collection('users')
      .find({ _id: new ObjectId(id) })
      .toArray(),
};

module.exports = users;
