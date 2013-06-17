"use strict";

var hull = require('hull');

var deserializer = function(userId, done) {
  User.getOrFetch(userId, done);
};


var authMiddleware = hull.middleware(deserializer);

module.exports = function (app) {
  app.get('/use_hull', authMiddleware, function(req, res) {
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
};


