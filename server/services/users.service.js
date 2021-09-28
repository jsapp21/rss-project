/* eslint-disable no-debugger */
const { ObjectId } = require('bson');
const mongoService = require('./mongo.service');

const users = {
  getUsers: () => mongoService.db.collection('users').find({}).toArray(),
};

module.exports = users;
