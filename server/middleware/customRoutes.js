/* eslint-disable no-console */
/* eslint-disable no-debugger */
const { AccessDenied } = require('../utils/errors');

const customRoutes = (req, res, next) => {
  debugger;
  const auth = 'Cheeseburger';
  req.auth = auth;
  if (req.body.name !== auth) {
    throw new AccessDenied('Error: You do not have permissons.');
  }
  debugger;
  next();
};

module.exports = customRoutes;
