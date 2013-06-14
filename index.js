"use strict";

var Hull = require('hull');

var hullClient = new Hull({
  appId: "50f992c179ab99a7ca000007",
  orgUrl: "http://maisheull.hullapp.dev",
  appSecret: "a55a8f694783c4f0c1dee7fd6ca9ad09"
});

/**
 * The silliest authentication method ever seen!
 * If `password === username.toUpperCase()`, passport will consider
 * the user logged in with its name as an id
 */
function authenticate(username, password, done) {
  if (password === username.toUpperCase()) {
    return done(null, {id: username});
  } else {
    return done(null, false, {message: 'Invalid password'});
  }
};

function serializeUser(user, done) {
  console.log('S', user);
  done(null, user.id);
}

function deserializeUser(userId, done) {
  console.log('D',userId);
  var user = {id: userId, name: userId, email: [userId, userId + '.org'].join('@')};
  done(null, user);
}

var passport = require('./config/passport')(authenticate, serializeUser, deserializeUser),
    app = require('./config/app')(passport.initialize(), passport.session());


app.get('/', res.render.bind('anonymous'));


app.get('/logout', function (req, res, next) {
  req.logout();
  res.redirect('/');
});

app.post(
  '/login',
  passport.authenticate('local', {successRedirect: '/loggedIn', failureRedirect: '/'})
);

app.get('/loggedIn', function (req, res, next) {
  if (!req.user) {
    return res.redirect('/');
  }
  var config = {
    user_hash: Hull.utils.signUserData(req.user, hullClient.conf.appSecret)
  };
  res.render('loggedIn', config);
});


app.listen(3000);
