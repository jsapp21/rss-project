/* eslint-disable no-debugger */
const { NotFound } = require('../utils/errors');
const users = require('../services/users.service');

const setUser = async (req, res, next) => {
  const user = await users.getUser(req.params.id);
  if (!user) {
    throw NotFound('Error: No user found');
  } else {
    req.session.user = { _id: req.params.id, role: user.role };
    // req.app.locals.user = { _id: req.params.id, role: user.role };
    // doing it this way doesn't hold on the session
    // res.locals.user = req.user;
    // unable to set a req.user from passport
    return next();
  }
};

module.exports = setUser;
