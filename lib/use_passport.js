var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('./user');

module.exports = function(app) {

  passport.use(new LocalStrategy(function (email, password, done) {
    var name = email.split("@")[0];
    return done(null, { id: email, email: email, name: name });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(username, done) {
    done(null, { id: username, email: username, name: username });
  });

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/passport', function(req, res) {
    res.render('passport', {
      current_user: req.user
    });
  });

  app.post('/passport',
    passport.authenticate('local', { 
      successRedirect: '/passport',
      failureRedirect: '/passport'
    })
  );


};