/* eslint-disable no-debugger */
const { AccessDenied } = require('../utils/errors');

const userPermissions = (req, res, next) => {
  if (req.app.locals.role !== 'GUEST') {
    throw new AccessDenied('Error: You do not have permissons.');
  } else {
    next();
  }
};

module.exports = userPermissions;
