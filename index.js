"use strict";

//
//
// Initializes Hull module
//
//

var hull = require('hull');

hull.conf({
  appId: "51bf3c5f3c923f805f0001ec",
  orgUrl: "http://hull-demos.hullapp.io",
  appSecret: "68889ea92eb685b92d9ee08e1d483365"
});


var app = require('./config/app')();

app.use('/use_passport', require('./lib/use_passport'));
app.use('/use_hull', require('./lib/use_hull'));
app.use(app.router);


//
//
// ROUTES
//
//

app.get('/', function (req, res, next){
  res.redirect('/use_hull');
});

app.listen(3000);
