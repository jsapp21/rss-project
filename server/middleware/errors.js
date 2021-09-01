/* eslint-disable no-console */
/* eslint-disable consistent-return */
module.exports = (errorHandler) => async (req, res, next) => {
  try {
    console.log('errHandler called');
    res.send(await errorHandler(req));
  } catch (err) {
    next(err);
  }
};

// module.exports = (errorHandler) => (req, res, next) => {
//   errorHandler(req, res, next).catch(next);
// };

// function that takes a function and returns req, res, next
// if any errors accur it will catch next function which is next error handler
