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
  var user = req.hull.user || {};
  res.render('hull', {
    current_user: user,
    config: {
      appId:  config.appId,
      orgUrl: config.orgUrl,
      debug:  true
    }
  });
});

module.exports = app;

