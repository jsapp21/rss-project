/* eslint-disable class-methods-use-this */
/* eslint-disable no-debugger */
/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
class ServerError extends Error {
  getCode() {
    return 500;
  }
}
class BadRequest extends Error {
  getCode() {
    return 400;
  }
}
class NotFound extends Error {
  getCode() {
    return 404;
  }
}

class AccessDenied extends Error {
  getCode() {
    return 403;
  }
}

module.exports = {
  ServerError,
  NotFound,
  AccessDenied,
  BadRequest,
};
