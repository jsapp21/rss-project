/* eslint-disable no-debugger */
// const passport = require('passport');
const { AccessDenied } = require('../utils/errors');

const userPermissions = async (req, res, next) => {
  if (req.session.user.role !== 'ADMIN') {
    throw new AccessDenied('Error: You do not have permissons.');
  } else {
    next();
  }
};

module.exports = userPermissions;
