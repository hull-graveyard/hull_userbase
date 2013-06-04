var Hull = require('hull'),
    User = require('./user');
    


module.exports = function(app) {

  var config = {
    appId:      "50d5b206a5b190d0aa000004",
    orgUrl:     "http://super.hullapp.dev",
    appSecret:  "342f8b2efccdaa5d4ec9f514c4fd3ae0"
  };

  var hull = new Hull(config);
  User.hullClient = hull;
  hull.deserializeUser(function(userId, done) { User.getOrFetch(userId, done) });

  var authMiddleware = hull.authenticateUser();
  app.use(authMiddleware);

  app.get('/hull', function(req, res) {
    res.render('hull', {
      current_user: req.hull,
      config: {
        appId:  config.appId,
        orgUrl: config.orgUrl,
        debug:  true
      }
    });
  });

};