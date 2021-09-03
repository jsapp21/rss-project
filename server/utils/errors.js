/* eslint-disable class-methods-use-this */
/* eslint-disable no-debugger */
/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
class ServerError extends Error {
  getCode() {
    debugger;
    return 500;
  }
}

class NotFound extends Error {
  getCode() {
    debugger;
    return 404;
  }
}

module.exports = {
  ServerError,
  NotFound,
};
