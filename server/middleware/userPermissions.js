/* eslint-disable no-debugger */
const { AccessDenied } = require('../utils/errors');
const users = require('../services/users.service');

const userPermissions = async (req, res, next) => {
  const user = await users.getUser(req.body.userId ? req.body.userId : req.body._id);
  // is this worth the db call?
  if (user.role !== 'ADMIN') {
    throw new AccessDenied('Error: You do not have permissons.');
  } else {
    next();
  }
};

module.exports = userPermissions;
