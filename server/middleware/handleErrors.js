/* eslint-disable no-debugger */
const handleErrors = (err, req, res, next) => {
  res.status(err.getCode()).json({
    status: res.statusCode,
    message: err.message,
  });
};

module.exports = handleErrors;
