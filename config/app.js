"use strict";
var express = require('express'),
    slice = [].slice;

function _useMiddlewares () {
  slice.call(arguments).forEach(function (middleware) {
    this.use(middleware);
  }, this);
}

module.exports = function () {
  var app = express();

  app.set('view engine', 'jade');
  app.set('views', require('path').resolve(__dirname, '../views'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: "Na na na, I'm secret!" }));
  _useMiddlewares.apply(app, arguments);
  return app;
};
