"use strict";

var hull = require('hull'),
    User = require('./user');

var deserializer = function(userId, done) {
  User.getOrFetch(userId, done);
};


module.exports = function(app, config) {
  hull.conf(config);
  User.hullClient = new hull.client();

  var authMiddleware = hull.middleware(deserializer);
  app.use(authMiddleware);

  app.get('/hull', function(req, res) {
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
