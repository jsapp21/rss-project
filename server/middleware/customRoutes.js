/* eslint-disable no-console */
/* eslint-disable no-debugger */
const { AccessDenied } = require('../utils/errors');

const customRoutes = (req, res, next) => {
  if (req.auth !== 'ADMIN') {
    throw new AccessDenied('Error: You do not have permissons.');
  } else {
    next();
  }
};

module.exports = customRoutes;

// permissions:
// jwt: auth
// type: "ADMIN" "USER" "GUEST"
// roles tied to specific paths
// user === ['/items', '/menus'] : READ ONLY
// admin === ['/items/outofstock'] : CREATE, EDIT, DELETE

// name:
// email:
// type: "admin"

// You login w/ your credentials
// if successful type: is given

// if certain type then show only
// You can put that information in the root of your application and store it in local storage.
