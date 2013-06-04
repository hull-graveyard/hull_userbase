var express = require('express'),
    app = express(),
    useHull = require('./lib/use_hull'),
    usePassport = require('./lib/use_passport');

var config = {
  appId:      "50cf17731fb4e935ea000001",
  orgUrl:     "http://sbellity.hullapp.dev",
  appSecret:  "c23d27fcf8c683c28a236c36d41dc457"
};


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: "Na na na, I'm secret!" }));

useHull(app, config);
usePassport(app, config);

app.use(app.router);


app.get('/', function (req, res) {
  res.render('index');
});

app.listen(3023);
