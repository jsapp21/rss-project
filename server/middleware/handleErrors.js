/* eslint-disable no-debugger */
const handleErrors = (err, req, res, next) => {
  res.status(err.getCode ? err.getCode() : 500).json({
    status: res.statusCode,
    message: err.message,
  });
};

module.exports = handleErrors;
