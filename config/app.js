"use strict";
var express = require('express');

module.exports = function () {
  var app = express();

  app.set('view engine', 'jade');
  app.set('views', require('path').resolve(__dirname, '../views'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: "Na na na, I'm secret!" }));
  return app;
};
