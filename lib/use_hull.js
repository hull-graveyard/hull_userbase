var Hull = require('hull'),
    User = require('./user');
    


module.exports = function(app, config) {
  var hull = new Hull(config);
  User.hullClient = hull;
  hull.deserializeUser(function(userId, done) { User.getOrFetch(userId, done) });

  var authMiddleware = hull.authenticateUser();
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