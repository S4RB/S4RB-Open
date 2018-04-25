const express = require('express');

class IndexRoute {
  constructor() {
    this.router = express.Router();

    this.router.get('/', (req, res, next) => {
      next();
    });
  }
}

module.exports = {
  IndexRoute
};
