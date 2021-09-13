/* eslint-disable no-console */
/* eslint-disable no-debugger */
const { AccessDenied } = require('../utils/errors');

const customRoutes = (req, res, next) => {
  // '/items/ POST
  // '/items/delete/:id 'DELETE'
  // '/items/outofstock/ 'POST'
  if (req.originalUrl === '/items' || (req.originalUrl === '/items/outofstock/' && req.method === 'POST')) {
    throw new AccessDenied('Error: You do not have permissons.');
  } else if (req.method === 'DELETE') {
    throw new AccessDenied('Error: You do not have permissons.');
  } else {
    next();
  }
};

module.exports = customRoutes;
