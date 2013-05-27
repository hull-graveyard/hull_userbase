var express = require('express'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    app = express(),
    hull = require('hull');

var hullClient = hull({
  appId: "50f992c179ab99a7ca000007",
  orgUrl: "http://maisheull.hullapp.dev",
  appSecret: "a55a8f694783c4f0c1dee7fd6ca9ad09"
});

passport.use(new LocalStrategy(function (username, password, done) {
  if (password === username.toUpperCase()) {
    return done(null, {id: username});
  } else {
    return done(null, false, {message: 'Invalid password'});
  }
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(username, done) {
  var user = {id: username};
  done(null, user);
});

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: "Na na na, I'm secret!" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

app.get('/', function (req, res) {
  var config = {}, tpl = 'anonymous';
  if (req.user) {
    tpl = "loggedIn";
    config = {
      user: req.user,
      user_hash: hullClient.getUserHash(req.user.id)
    };
  }
  res.render(tpl, config);
});

app.post('/login',
  passport.authenticate('local', {successRedirect: '/', failureRedirect: '/fail'})
);


app.listen(3000);
