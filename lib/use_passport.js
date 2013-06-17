"use strict";

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    hull = require('hull'),
    hullConfig = hull.conf(),
    app = require('express')();

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

app.get('/', function(req, res) {
  var config = {
    appId:  hullConfig.appId,
    orgUrl: hullConfig.orgUrl,
    debug:  true
  };
  if (req.user) {
    config.userHash = hull.utils.signUserData(req.user);
  }
  res.render('passport', {
    current_user: req.user,
    config: config,
    url: (req.originalUrl || '') + '/passport'
  });
});

app.post('/passport',
  passport.authenticate('local', {
    successRedirect: '/use_passport',
    failureRedirect: '/use_passport'
  })
);

module.exports = app;
