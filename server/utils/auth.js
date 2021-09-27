/* eslint-disable no-debugger */
const passport = require('passport');
const LocalStrategy = require('passport-local');
const users = require('../services/users.service');

passport.use(
  new LocalStrategy({ userNameField: '_id' }, async (id, role, done) => {
    try {
      debugger;
      const user = await users.getUser({ _id: id });
      if (!user) {
        return done(null, false, { message: 'Invalid user' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
  try {
    debugger;
    const user = await users.getUser(id);
    debugger;
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

module.exports = {
  initalize: passport.initialize(),
  session: passport.session(),
  setUser: (req, res, next) => {
    debugger;
    res.locals.user = req.user;
    debugger;
    return next();
  },
};
