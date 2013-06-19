"use strict";

var hull = require('hull'),
    app = require('express')(),
    User = require('./user');

var deserializer = function(userId, done) {
  User.getOrFetch(userId, done);
};


var authMiddleware = hull.middleware(deserializer);

app.get('/', authMiddleware, function(req, res) {
  var config = hull.conf();
  res.render('hull', {
    config: {
      appId:  config.appId,
      orgUrl: config.orgUrl,
      debug:  true
    }
  });
});

app.get('/user', authMiddleware, function (req, res, next) {
  res.json(req.hull.user);
});

module.exports = app;

