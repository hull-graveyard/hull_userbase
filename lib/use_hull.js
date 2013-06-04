var Hull = require('hull'),
    User = require('./user');


module.exports = function(app) {

  var hull = new Hull({
    appId: "50d5b206a5b190d0aa000004",
    orgUrl: "http://super.hullapp.dev",
    appSecret: "342f8b2efccdaa5d4ec9f514c4fd3ae0"
  });

  hull.serializeUser(User.getOrFetch);

  app.use(hull.authenticateUser());

  app.get('/hull', function(req, res) {
    res.render('hull', {
      current_user: req.hull
    });
  });
};