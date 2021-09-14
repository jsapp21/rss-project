/* eslint-disable no-console */
/* eslint-disable no-debugger */
const { AccessDenied } = require('../utils/errors');

const customRoutes = (req, res, next) => {
  if (req.body.auth !== 'ADMIN') {
    throw new AccessDenied('Error: You do not have permissons.');
  } else {
    next();
  }
};

module.exports = customRoutes;
