"use strict";

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

module.exports = function (authFn, serializer, deserializer) {
  passport.use(new LocalStrategy(authFn));

  passport.serializeUser(serializer);

  passport.deserializeUser(deserializer);

  return passport;
};
